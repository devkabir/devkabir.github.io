import React from 'react';
import {
  Puzzle,
  Code2,
  Star,
  Globe,
  Shield,
  BarChart3,
  ShoppingCart,
  Zap,
  Mail,
  Phone,
  Linkedin,
  Download,
  Check,
  ExternalLink,
  FileText,
  Terminal,
  Layers,
  ArrowUpRight,
  MapPin,
  Send,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LucideProps,
} from 'lucide-react';

const iconMap: Record<string, React.FC<LucideProps>> = {
  Puzzle,
  Code2,
  Star,
  Globe,
  Shield,
  BarChart3,
  ShoppingCart,
  Zap,
  Mail,
  Phone,
  Linkedin,
  Download,
  Check,
  ExternalLink,
  FileText,
  Terminal,
  Layers,
  ArrowUpRight,
  MapPin,
  Send,
  Sun,
  Moon,
  Menu,
  X,
  User,
};

export interface IconProps extends LucideProps {
  name: string;
  size?: number | string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, className = '', ...props }) => {
  // Case-insensitive lookup or exact match
  const matchedKey = Object.keys(iconMap).find((key) => key.toLowerCase() === name.toLowerCase());

  const Component = matchedKey ? iconMap[matchedKey] : FileText;

  return <Component size={size} className={className} {...props} />;
};
