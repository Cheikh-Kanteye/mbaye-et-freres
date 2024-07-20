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
      onClick={onClick}
      className={`flex items-center justify-center p-2 rounded-full focus:outline-none transition ${className} ${
        disabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"
      }`}
      disabled={disabled}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};

export default IconButton;
