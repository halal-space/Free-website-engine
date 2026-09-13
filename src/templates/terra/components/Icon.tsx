import React from 'react';
import {
  Search,
  User,
  ShoppingBag,
  Plus,
  Minus,
  X,
  Star,
  ArrowRight,
  ArrowLeft,
  Check,
  Trash2,
  Truck,
  Gift,
  Leaf,
  MapPin,
  ChevronDown,
  Package,
  Mail,
  CreditCard,
  ShieldCheck,
  Snowflake,
  Menu,
  Phone,
  Clock,
  Store,
  Banknote,
  Lock,
  SlidersHorizontal,
  LucideProps,
} from 'lucide-react';

const ICONS = {
  Search,
  User,
  ShoppingBag,
  Plus,
  Minus,
  X,
  Star,
  ArrowRight,
  ArrowLeft,
  Check,
  Trash2,
  Truck,
  Gift,
  Leaf,
  MapPin,
  ChevronDown,
  Package,
  Mail,
  CreditCard,
  ShieldCheck,
  Snowflake,
  Menu,
  Phone,
  Clock,
  Store,
  Banknote,
  Lock,
  SlidersHorizontal,
};

export type IconName = keyof typeof ICONS;

export default function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  className,
  ...props
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
} & Omit<LucideProps, 'ref'>) {
  const IconComponent = ICONS[name] || Search;
  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
      {...props}
    />
  );
}
