import type { ChangeEvent } from "react";

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
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={id}
          id={id}
          onChange={onChange}
          placeholder={placeholder ?? label}
          required={required}
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-slate-500 focus:ring-slate-500 focus:outline-none sm:text-sm"
        />
      </div>
    </>
  );
};
