export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  text,
  startIcon,
  endIcon,
  onClick,
}) => {
  const variantClasses: Record<ButtonProps["variant"], string> = {
    primary: "bg-primary-300 text-white hover:opacity-90",
    secondary: "bg-secondary-300 text-black hover:opacity-80",
  };

  const sizeClasses: Record<ButtonProps["size"], string> = {
    sm: "px-2 py-1 text-sm rounded",
    md: "px-4 py-2 text-base rounded-md",
    lg: "px-6 py-3 text-lg rounded-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} ${sizeClasses[size]} flex  gap-2 font-light items-center transition cursor-pointer `}
    >
      {startIcon && <span className="icon-start">{startIcon}</span>}
      {text}
      {endIcon && <span className="icon-end">{endIcon}</span>}
    </button>
  );
};
