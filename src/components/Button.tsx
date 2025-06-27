import Link from "next/link";
import { ReactNode } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ButtonProps {
  href?: string;
  variant?:
    | "text"
    | "default"
    | "outline"
    | "secondary"
    | "tertiary"
    | "accent"
    | "muted"
    | "destructive"
    | "ghost"
    | "link"
    | "success"
    | "warning";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  arrow?: "right" | "left";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({
  href,
  variant = "default",
  size = "md",
  arrow,
  className = "",
  children,
  onClick,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const sizeClasses = {
    xs: "h-6 px-2 text-xs rounded",
    sm: "h-8 px-3 text-sm rounded-md",
    md: "h-10 px-4 text-sm rounded-md",
    lg: "h-12 px-6 text-base rounded-lg",
    xl: "h-14 px-8 text-lg rounded-lg",
  };

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/95",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/95",
    tertiary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/95",
    accent: "bg-accent text-accent-foreground hover:bg-accent/95",
    muted: "bg-muted text-muted-foreground hover:bg-muted/95",
    outline:
      "border border-border text-tertiary underline text-tertiary underline-offset-2 decoration-2 hover:bg-muted/50 hover:text-foreground",
    destructive: "bg-destructive text-white hover:bg-destructive/95",
    ghost: "hover:bg-secondary hover:text-secondary-foreground text-secondary",
    link: "underline text-tertiary underline-offset-2 decoration-2 hover:no-underline mx-0 px-0",
    text: "text-blue-600 hover:text-blue-700",
    success: "bg-green-500 text-white hover:bg-green-600",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const iconSizes = {
    xs: "h-3 w-3",
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
    xl: "h-6 w-6",
  };

  const content = (
    <>
      {arrow === "left" && <FaChevronLeft className={iconSizes[size]} />}
      {children}
      {arrow === "right" && <FaChevronRight className={iconSizes[size]} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
