import type { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "password";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput = ({
  id,
  label,
  placeholder,
  required = false,
  type = "text",
  onChange,
}: Props) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        name={id}
        id={id}
        onChange={onChange}
        placeholder={placeholder ?? label}
        required={required}
      />
    </div>
  );
};
