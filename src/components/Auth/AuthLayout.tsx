import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

export const AuthLayout = ({ title = "Notionクローン", children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
        <div className="mt-8 w-full max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
