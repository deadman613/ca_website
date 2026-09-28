import Link from "next/link";
import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "gold" | "outline-white" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  withArrow?: boolean;
  target?: string;
  rel?: string;
}

const variantClasses = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  gold: "btn-gold",
  "outline-white": "btn-outline-white",
  ghost:
    "inline-flex items-center gap-2 text-navy font-semibold text-sm hover:text-gold transition-colors",
};

const sizeClasses = {
  sm: "text-xs px-4 py-2",
  md: "",
  lg: "text-base px-8 py-4",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled,
  withArrow,
  target,
  rel,
}: ButtonProps) {
  const classes = clsx(
    variantClasses[variant],
    size !== "md" && sizeClasses[size],
    disabled && "opacity-50 pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
        {withArrow && <ArrowRight size={15} />}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
      {withArrow && <ArrowRight size={15} />}
    </button>
  );
}
