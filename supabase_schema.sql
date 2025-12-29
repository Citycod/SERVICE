-- =============================================
-- JoyDome Marketplace - Extended Schema
-- Run this in your Supabase SQL Editor
-- =============================================

-- Enable UUID extension (if not already enabled)
create extension if not exists "uuid-ossp";

-- =============================================
-- EXTEND PROFILES TABLE
-- =============================================
-- Add missing columns to profiles if they don't exist
alter table profiles add column if not exists is_verified boolean default false;
alter table profiles add column if not exists is_banned boolean default false;
alter table profiles add column if not exists skills text[];
alter table profiles add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());

-- =============================================
-- EXTEND SERVICES TABLE
-- =============================================
-- Add status column for approval workflow
alter table services add column if not exists status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'paused'));
alter table services add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());
alter table services add column if not exists views integer default 0;

-- =============================================
-- EXTEND ORDERS TABLE
-- =============================================
alter table orders add column if not exists seller_id uuid references profiles(id);
alter table orders add column if not exists requirements text;
alter table orders add column if not exists delivery_date timestamp with time zone;
alter table orders add column if not exists completed_at timestamp with time zone;
alter table orders add column if not exists cancelled_at timestamp with time zone;
alter table orders add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());

-- Update status check constraint for orders
alter table orders drop constraint if exists orders_status_check;
alter table orders add constraint orders_status_check 
  check (status in ('pending', 'paid', 'in_progress', 'delivered', 'completed', 'cancelled', 'disputed'));

-- =============================================
-- MESSAGES TABLE (New)
-- =============================================
create table if not exists messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid,
  sender_id uuid references profiles(id) on delete cascade,
  recipient_id uuid references profiles(id) on delete cascade,
  content text not null,
  type text default 'text' check (type in ('text', 'image', 'file', 'system')),
  status text default 'sent' check (status in ('sent', 'delivered', 'read')),
  service_id uuid references services(id) on delete set null,
  order_id uuid references orders(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create index for faster message queries
create index if not exists idx_messages_sender on messages(sender_id);
create index if not exists idx_messages_recipient on messages(recipient_id);
create index if not exists idx_messages_conversation on messages(conversation_id);

-- =============================================
-- CONVERSATIONS TABLE (New)
-- =============================================
create table if not exists conversations (
  id uuid default uuid_generate_v4() primary key,
  participant_1 uuid references profiles(id) on delete cascade,
  participant_2 uuid references profiles(id) on delete cascade,
  service_id uuid references services(id) on delete set null,
  last_message_at timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(participant_1, participant_2, service_id)
);

-- =============================================
-- FAVORITES TABLE (New)
-- =============================================
create table if not exists favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  service_id uuid references services(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, service_id)
);

-- Create index for faster favorites queries
create index if not exists idx_favorites_user on favorites(user_id);

-- =============================================
-- NOTIFICATIONS TABLE (New)
-- =============================================
create table if not exists notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  message text,
  type text check (type in ('order', 'message', 'payment', 'review', 'system', 'verification')),
  is_read boolean default false,
  link text,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create index for faster notification queries
create index if not exists idx_notifications_user on notifications(user_id);
create index if not exists idx_notifications_unread on notifications(user_id, is_read) where is_read = false;

-- =============================================
-- WITHDRAWALS TABLE (New)
-- =============================================
create table if not exists withdrawals (
  id uuid default uuid_generate_v4() primary key,
  seller_id uuid references profiles(id) on delete cascade,
  amount decimal(10,2) not null,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'completed')),
  bank_name text,
  account_number text,
  account_name text,
  admin_notes text,
  processed_by uuid references profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  processed_at timestamp with time zone
);

-- =============================================
-- CATEGORIES TABLE (New)
-- =============================================
create table if not exists categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  icon text,
  parent_id uuid references categories(id),
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Insert default categories for Nigerian services
insert into categories (name, slug, description, icon) values
  ('Catering & Food', 'catering-food', 'Food services, event catering, meal prep', 'utensils'),
  ('Plumbing', 'plumbing', 'Plumbing repairs and installations', 'wrench'),
  ('Electrical', 'electrical', 'Electrical work and repairs', 'zap'),
  ('Cleaning', 'cleaning', 'Home and office cleaning services', 'sparkles'),
  ('Hair & Beauty', 'hair-beauty', 'Hair styling, makeup, and beauty services', 'scissors'),
  ('Photography', 'photography', 'Event and portrait photography', 'camera'),
  ('Event Planning', 'event-planning', 'Party and event coordination', 'calendar'),
  ('Tailoring', 'tailoring', 'Custom clothing and alterations', 'shirt'),
  ('Carpentry', 'carpentry', 'Woodwork and furniture making', 'hammer'),
  ('Painting', 'painting', 'House and decorative painting', 'paintbrush'),
  ('AC & Appliance Repair', 'appliance-repair', 'Air conditioning and appliance services', 'thermometer'),
  ('Driving & Logistics', 'driving-logistics', 'Driver services and deliveries', 'truck'),
  ('IT & Tech Support', 'it-tech', 'Computer repair and tech support', 'laptop'),
  ('Home Tutoring', 'tutoring', 'Academic tutoring and lessons', 'book-open'),
  ('Fitness & Training', 'fitness', 'Personal training and fitness coaching', 'dumbbell')
on conflict (slug) do nothing;

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS on new tables
alter table messages enable row level security;
alter table conversations enable row level security;
alter table favorites enable row level security;
alter table notifications enable row level security;
alter table withdrawals enable row level security;
alter table categories enable row level security;

-- MESSAGES POLICIES
create policy "Users can view their own messages" on messages 
  for select using (auth.uid() = sender_id or auth.uid() = recipient_id);

create policy "Users can send messages" on messages 
  for insert with check (auth.uid() = sender_id);

create policy "Users can update their sent messages" on messages 
  for update using (auth.uid() = sender_id);

-- CONVERSATIONS POLICIES
create policy "Users can view their conversations" on conversations 
  for select using (auth.uid() = participant_1 or auth.uid() = participant_2);

create policy "Users can create conversations" on conversations 
  for insert with check (auth.uid() = participant_1 or auth.uid() = participant_2);

-- FAVORITES POLICIES
create policy "Users can view their favorites" on favorites 
  for select using (auth.uid() = user_id);

create policy "Users can add favorites" on favorites 
  for insert with check (auth.uid() = user_id);

create policy "Users can remove their favorites" on favorites 
  for delete using (auth.uid() = user_id);

-- NOTIFICATIONS POLICIES
create policy "Users can view their notifications" on notifications 
  for select using (auth.uid() = user_id);

create policy "System can create notifications" on notifications 
  for insert with check (true);

create policy "Users can update their notifications" on notifications 
  for update using (auth.uid() = user_id);

-- WITHDRAWALS POLICIES
create policy "Sellers can view their withdrawals" on withdrawals 
  for select using (auth.uid() = seller_id);

create policy "Sellers can request withdrawals" on withdrawals 
  for insert with check (auth.uid() = seller_id);

-- CATEGORIES POLICIES
create policy "Anyone can view active categories" on categories 
  for select using (is_active = true);

-- =============================================
-- ADMIN POLICIES (using service role or admin check)
-- =============================================
-- Note: Admin operations should use service role key or check profile role

-- Create admin check function
create or replace function is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from profiles 
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Admin can view all users
create policy "Admins can view all profiles" on profiles 
  for select using (is_admin());

-- Admin can update any profile (for banning, verification)
create policy "Admins can update profiles" on profiles 
  for update using (is_admin());

-- Admin can view all services
create policy "Admins can manage services" on services 
  for all using (is_admin());

-- Admin can view all orders  
create policy "Admins can view all orders" on orders 
  for select using (is_admin());

-- Admin can update orders (disputes, refunds)
create policy "Admins can update orders" on orders 
  for update using (is_admin());

-- Admin can manage withdrawals
create policy "Admins can manage withdrawals" on withdrawals 
  for all using (is_admin());

-- Admin can manage categories
create policy "Admins can manage categories" on categories 
  for all using (is_admin());

-- =============================================
-- REALTIME SUBSCRIPTIONS
-- =============================================
-- Enable realtime for messages
alter publication supabase_realtime add table messages;
alter publication supabase_realtime add table notifications;
alter publication supabase_realtime add table conversations;

-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Function to get or create conversation
create or replace function get_or_create_conversation(
  p_user1 uuid,
  p_user2 uuid,
  p_service_id uuid default null
)
returns uuid as $$
declare
  v_conversation_id uuid;
begin
  -- Try to find existing conversation
  select id into v_conversation_id
  from conversations
  where ((participant_1 = p_user1 and participant_2 = p_user2)
     or (participant_1 = p_user2 and participant_2 = p_user1))
    and (service_id = p_service_id or (service_id is null and p_service_id is null))
  limit 1;
  
  -- Create if not exists
  if v_conversation_id is null then
    insert into conversations (participant_1, participant_2, service_id)
    values (p_user1, p_user2, p_service_id)
    returning id into v_conversation_id;
  end if;
  
  return v_conversation_id;
end;
$$ language plpgsql security definer;

-- Function to calculate seller earnings
create or replace function get_seller_earnings(p_seller_id uuid)
returns table (
  total_earnings decimal,
  pending_earnings decimal,
  withdrawn_amount decimal,
  available_balance decimal
) as $$
begin
  return query
  with order_earnings as (
    select coalesce(sum(amount), 0) as total
    from orders
    where seller_id = p_seller_id and status = 'completed'
  ),
  pending as (
    select coalesce(sum(amount), 0) as total
    from orders
    where seller_id = p_seller_id and status in ('paid', 'in_progress', 'delivered')
  ),
  withdrawn as (
    select coalesce(sum(amount), 0) as total
    from withdrawals
    where seller_id = p_seller_id and status = 'completed'
  )
  select 
    order_earnings.total as total_earnings,
    pending.total as pending_earnings,
    withdrawn.total as withdrawn_amount,
    (order_earnings.total - withdrawn.total) as available_balance
  from order_earnings, pending, withdrawn;
end;
$$ language plpgsql security definer;
