import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, Globe, Download, Smartphone, ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';

export const Icons = {
  Github: Github,
  Linkedin: Linkedin,
  Whatsapp: Phone, // Mapping Whatsapp to Phone icon for simplicity or custom if needed
  Mail: Mail,
  MapPin: MapPin,
  Globe: Globe,
  Download: Download,
  Smartphone: Smartphone,
  ChevronLeft: ChevronLeft,
  ChevronRight: ChevronRight,
  Sun: Sun,
  Moon: Moon
};

export const SocialIcon = ({ network, className }: { network: string, className?: string }) => {
  const normalized = network.toLowerCase();
  if (normalized.includes('github')) return <Icons.Github className={className} />;
  if (normalized.includes('linkedin')) return <Icons.Linkedin className={className} />;
  if (normalized.includes('whatsapp')) return <Icons.Whatsapp className={className} />;
  return <Icons.Globe className={className} />;
};