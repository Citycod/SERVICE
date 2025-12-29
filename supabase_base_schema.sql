-- =============================================
-- JoyDome Marketplace - COMPLETE BASE SCHEMA
-- Run this FIRST in your Supabase SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- 1. PROFILES TABLE (Base)
-- =============================================
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  phone text,
  email text,
  avatar_url text,
  role text default 'buyer' check (role in ('buyer', 'seller', 'admin')),
  bio text,
  location text,
  category text,
  skills text[],
  is_verified boolean default false,
  is_banned boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS on profiles
alter table profiles enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone" on profiles 
  for select using (true);

create policy "Users can insert their own profile" on profiles 
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile" on profiles 
  for update using (auth.uid() = id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', ''),
    coalesce(new.raw_user_meta_data->>'role', 'buyer')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================================
-- 2. SERVICES TABLE (Base)
-- =============================================
create table if not exists services (
  id uuid default uuid_generate_v4() primary key,
  seller_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text,
  price decimal(10,2) not null,
  category text,
  delivery_time text,
  images text[],
  tags text[],
  requirements text[],
  location text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'paused')),
  views integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS on services
alter table services enable row level security;

-- Services policies
create policy "Approved services are viewable by everyone" on services 
  for select using (status = 'approved' or auth.uid() = seller_id);

create policy "Sellers can insert their own services" on services 
  for insert with check (auth.uid() = seller_id);

create policy "Sellers can update their own services" on services 
  for update using (auth.uid() = seller_id);

create policy "Sellers can delete their own services" on services 
  for delete using (auth.uid() = seller_id);

-- =============================================
-- 3. ORDERS TABLE (Base)
-- =============================================
create table if not exists orders (
  id uuid default uuid_generate_v4() primary key,
  buyer_id uuid references profiles(id) on delete cascade not null,
  seller_id uuid references profiles(id) on delete cascade,
  service_id uuid references services(id) on delete set null,
  amount decimal(10,2) not null,
  status text default 'pending' check (status in ('pending', 'paid', 'in_progress', 'delivered', 'completed', 'cancelled', 'disputed')),
  requirements text,
  delivery_date timestamp with time zone,
  completed_at timestamp with time zone,
  cancelled_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS on orders
alter table orders enable row level security;

-- Orders policies
create policy "Users can view their own orders" on orders 
  for select using (auth.uid() = buyer_id or auth.uid() = seller_id);

create policy "Buyers can create orders" on orders 
  for insert with check (auth.uid() = buyer_id);

create policy "Order participants can update orders" on orders 
  for update using (auth.uid() = buyer_id or auth.uid() = seller_id);

-- =============================================
-- 4. REVIEWS TABLE (Base)
-- =============================================
create table if not exists reviews (
  id uuid default uuid_generate_v4() primary key,
  service_id uuid references services(id) on delete cascade not null,
  order_id uuid references orders(id) on delete cascade,
  reviewer_id uuid references profiles(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS on reviews
alter table reviews enable row level security;

-- Reviews policies
create policy "Reviews are viewable by everyone" on reviews 
  for select using (true);

create policy "Users can create reviews for their orders" on reviews 
  for insert with check (auth.uid() = reviewer_id);

-- =============================================
-- 5. MESSAGES TABLE
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

-- Enable RLS
alter table messages enable row level security;

create policy "Users can view their own messages" on messages 
  for select using (auth.uid() = sender_id or auth.uid() = recipient_id);

create policy "Users can send messages" on messages 
  for insert with check (auth.uid() = sender_id);

-- =============================================
-- 6. CONVERSATIONS TABLE
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

alter table conversations enable row level security;

create policy "Users can view their conversations" on conversations 
  for select using (auth.uid() = participant_1 or auth.uid() = participant_2);

create policy "Users can create conversations" on conversations 
  for insert with check (auth.uid() = participant_1 or auth.uid() = participant_2);

-- =============================================
-- 7. FAVORITES TABLE
-- =============================================
create table if not exists favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  service_id uuid references services(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, service_id)
);

alter table favorites enable row level security;

create policy "Users can view their favorites" on favorites 
  for select using (auth.uid() = user_id);

create policy "Users can add favorites" on favorites 
  for insert with check (auth.uid() = user_id);

create policy "Users can remove their favorites" on favorites 
  for delete using (auth.uid() = user_id);

-- =============================================
-- 8. NOTIFICATIONS TABLE
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

alter table notifications enable row level security;

create policy "Users can view their notifications" on notifications 
  for select using (auth.uid() = user_id);

create policy "System can create notifications" on notifications 
  for insert with check (true);

create policy "Users can update their notifications" on notifications 
  for update using (auth.uid() = user_id);

-- =============================================
-- 9. WITHDRAWALS TABLE
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

alter table withdrawals enable row level security;

create policy "Sellers can view their withdrawals" on withdrawals 
  for select using (auth.uid() = seller_id);

create policy "Sellers can request withdrawals" on withdrawals 
  for insert with check (auth.uid() = seller_id);

-- =============================================
-- 10. CATEGORIES TABLE
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

alter table categories enable row level security;

create policy "Anyone can view active categories" on categories 
  for select using (is_active = true);

-- Insert default categories
insert into categories (name, slug, description, icon) values
  ('Catering & Food', 'catering-food', 'Food services and catering', 'utensils'),
  ('Plumbing', 'plumbing', 'Plumbing repairs and installations', 'wrench'),
  ('Electrical', 'electrical', 'Electrical work and repairs', 'zap'),
  ('Cleaning', 'cleaning', 'Home and office cleaning', 'sparkles'),
  ('Hair & Beauty', 'hair-beauty', 'Hair styling and beauty services', 'scissors'),
  ('Photography', 'photography', 'Event and portrait photography', 'camera'),
  ('Event Planning', 'event-planning', 'Party and event coordination', 'calendar'),
  ('Tailoring', 'tailoring', 'Custom clothing and alterations', 'shirt'),
  ('Carpentry', 'carpentry', 'Woodwork and furniture', 'hammer'),
  ('IT & Tech Support', 'it-tech', 'Computer repair and tech support', 'laptop')
on conflict (slug) do nothing;

-- =============================================
-- ADMIN FUNCTIONS & POLICIES
-- =============================================

-- Admin check function
create or replace function is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from profiles 
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Admin policies
create policy "Admins can view all profiles" on profiles 
  for select using (is_admin());

create policy "Admins can update profiles" on profiles 
  for update using (is_admin());

create policy "Admins can manage services" on services 
  for all using (is_admin());

create policy "Admins can view all orders" on orders 
  for select using (is_admin());

create policy "Admins can update orders" on orders 
  for update using (is_admin());

create policy "Admins can manage withdrawals" on withdrawals 
  for all using (is_admin());

create policy "Admins can manage categories" on categories 
  for all using (is_admin());

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================
create index if not exists idx_services_seller on services(seller_id);
create index if not exists idx_services_status on services(status);
create index if not exists idx_orders_buyer on orders(buyer_id);
create index if not exists idx_orders_seller on orders(seller_id);
create index if not exists idx_reviews_service on reviews(service_id);
create index if not exists idx_messages_conversation on messages(conversation_id);
create index if not exists idx_notifications_user on notifications(user_id);

-- =============================================
-- SUCCESS MESSAGE
-- =============================================
-- If you see this without errors, your database is set up!
select 'JoyDome database schema created successfully!' as message;
