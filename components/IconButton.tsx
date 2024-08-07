import { cn } from "@/lib/utils";
import React from "react";
import { IconType } from "react-icons";

interface IconButtonProps {
  icon: IconType;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
      className={cn(
        `flex items-center justify-center p-2 rounded-full focus:outline-none transition ${
          disabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"
        }`,
        className
      )}
      disabled={disabled}
    >
      <Icon />
    </button>
  );
};

export default IconButton;
