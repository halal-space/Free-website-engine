export interface NavLink {
  title: string;
  href: string;
  badge?: string;
}

export const mainNavLinks: NavLink[] = [
  { title: 'Shop', href: '/shop' },
  { title: 'New Arrivals', href: '/shop?filter=new', badge: 'New' },
  { title: 'Best Sellers', href: '/shop?filter=bestseller' },
  { title: 'Deals & Archive', href: '/deals' },
  { title: 'About', href: '/about' },
  { title: 'Concierge', href: '/contact' }
];

export const footerColumns = [
  {
    title: 'Collections',
    links: [
      { title: 'Acoustic Systems', href: '/category/audio' },
      { title: 'Flagship Mobile', href: '/category/smartphones' },
      { title: 'Precision Timepieces', href: '/category/smartwatches' },
      { title: 'Studio Computing', href: '/category/laptops' },
      { title: 'Tactile Gaming', href: '/category/gaming' },
      { title: 'Ambient Smart Home', href: '/category/smart-home' },
      { title: 'Refined Accessories', href: '/category/accessories' }
    ]
  },
  {
    title: 'Experience',
    links: [
      { title: 'Brand Story & Labs', href: '/about' },
      { title: 'Craftsmanship & Materials', href: '/about#materials' },
      { title: 'Sustainable Engineering', href: '/about#sustainability' },
      { title: 'Certified Refurbished', href: '/deals' },
      { title: 'Press & Editorial', href: '/about#press' }
    ]
  },
  {
    title: 'Concierge & Client Care',
    links: [
      { title: 'Order Status & Tracking', href: '/account' },
      { title: 'Complimentary Shipping & Returns', href: '/contact#shipping' },
      { title: '2-Year Bespoke Warranty', href: '/contact#warranty' },
      { title: 'Product Authentication', href: '/contact#auth' },
      { title: 'Direct VIP Concierge', href: '/contact' }
    ]
  },
  {
    title: 'Legal & Privacy',
    links: [
      { title: 'Privacy Policy', href: '/about' },
      { title: 'Terms of Service', href: '/about' },
      { title: 'Cookie Preferences', href: '/about' },
      { title: 'Accessibility Compliance', href: '/about' }
    ]
  }
];
