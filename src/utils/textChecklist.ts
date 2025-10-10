// utils/testChecklist.ts
export const integrationTestChecklist = {
  authentication: [
    'User can sign up as buyer/seller',
    'User can log in with correct credentials',
    'User cannot log in with wrong credentials',
    'User stays logged in after refresh',
    'User can log out successfully',
    'Protected routes redirect to login when unauthenticated'
  ],

  buyerFlow: [
    'Browse services without authentication',
    'View service details',
    'Search and filter services',
    'Add services to favorites',
    'Complete booking flow: Service → Order → Payment → Tracking',
    'Leave reviews for completed orders',
    'Track order status in real-time',
    'Message sellers from order tracking'
  ],

  sellerFlow: [
    'Create new service with images and details',
    'Edit existing services',
    'Manage service listings',
    'View and manage orders',
    'Update order status (accept/decline/complete)',
    'Withdraw earnings through payment methods',
    'View analytics and performance metrics',
    'Update seller profile information'
  ],

  navigation: [
    'All internal links work correctly',
    'Breadcrumb navigation shows correct path',
    'Back button works as expected',
    'Mobile navigation opens/closes properly',
    'Active states show current page',
    '404 page handles unknown routes'
  ],

  responsive: [
    'Desktop layout (1024px+) works correctly',
    'Tablet layout (768px-1023px) works correctly',
    'Mobile layout (<768px) works correctly',
    'Touch targets are minimum 44px',
    'Text is readable without zooming',
    'No horizontal scrolling on mobile'
  ],

  performance: [
    'Pages load within 3 seconds',
    'Images are optimized and lazy-loaded',
    'No console errors in browser',
    'Forms submit without freezing UI',
    'Navigation between pages is smooth',
    'Error boundaries catch runtime errors'
  ]
};