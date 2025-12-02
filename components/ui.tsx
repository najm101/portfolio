import React from 'react';

export interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "neon";
}

export const Badge: React.FC<BadgeProps> = ({ children, className = "", variant = "default" }) => {
  const variants = {
    default: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    secondary: "border-transparent bg-muted text-muted-foreground",
    outline: "text-foreground border-border",
    neon: "border-transparent bg-neon text-neon-foreground font-bold hover:bg-neon/90"
  };
  return (
    <div className={`inline-flex items-center rounded-sm border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", hoverEffect = true }) => {
  return (
    <div className={`rounded-xl border border-white/5 bg-card text-card-foreground shadow-sm relative overflow-hidden ${hoverEffect ? 'transition-all duration-300 hover:border-neon/50 hover:shadow-[0_0_15px_-5px_rgba(204,243,129,0.3)]' : ''} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<CardProps> = ({ children, className = "" }) => (
  <h3 className={`text-xl font-bold leading-none tracking-tight font-display ${className}`}>{children}</h3>
);

export const CardDescription: React.FC<CardProps> = ({ children, className = "" }) => (
  <p className={`text-sm text-muted-foreground leading-relaxed ${className}`}>{children}
  </p>
);

export const CardContent: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "neon";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = "neon", 
  size = "default",
  className = "",
  asChild = false,
  ...props
}) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    neon: "bg-neon text-neon-foreground hover:bg-neon/80 shadow-[0_0_10px_-3px_rgba(204,243,129,0.5)]",
    outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };
  const sizes = {
    default: "h-11 px-6 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-14 rounded-md px-8 text-base",
    icon: "h-10 w-10"
  };
  
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};