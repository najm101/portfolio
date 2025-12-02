import React from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  Globe, 
  Download, 
  Smartphone, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon,
  LayoutDashboard,
  LogOut,
  Edit2,
  Trash2,
  Plus,
  Save,
  X,
  User,
  Briefcase,
  FolderOpen,
  GripVertical,
  Upload,
  Image,
  Video,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export const Icons = {
  Github: Github,
  Linkedin: Linkedin,
  Whatsapp: Phone, 
  Mail: Mail,
  MapPin: MapPin,
  Globe: Globe,
  Download: Download,
  Smartphone: Smartphone,
  ChevronLeft: ChevronLeft,
  ChevronRight: ChevronRight,
  Sun: Sun,
  Moon: Moon,
  LayoutDashboard: LayoutDashboard,
  LogOut: LogOut,
  Edit: Edit2,
  Trash: Trash2,
  Plus: Plus,
  Save: Save,
  Close: X,
  User: User,
  Briefcase: Briefcase,
  Folder: FolderOpen,
  Grip: GripVertical,
  Upload: Upload,
  Image: Image,
  Video: Video,
  ArrowUp: ArrowUp,
  ArrowDown: ArrowDown
};

export const SocialIcon = ({ network, className }: { network: string, className?: string }) => {
  const normalized = network.toLowerCase();
  if (normalized.includes('github')) return <Icons.Github className={className} />;
  if (normalized.includes('linkedin')) return <Icons.Linkedin className={className} />;
  if (normalized.includes('whatsapp')) return <Icons.Whatsapp className={className} />;
  return <Icons.Globe className={className} />;
};