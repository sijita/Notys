import React from "react";

interface InputProps {
  name: string;
  value?: string;
  type: string;
  placeholder: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  pattern?: string;
  disabled?: boolean;
}

export default function Input({
  name,
  value,
  type,
  placeholder,
  className,
  onChange,
  required,
  pattern,
  disabled,
}: InputProps) {
  return (
    <input
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      className={`input w-full ${className}`}
      onChange={onChange}
      required={required}
      pattern={pattern}
      disabled={disabled}
    />
  );
}
