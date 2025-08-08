import { useState } from "react";
import { Navigate } from "react-router-dom";

import { AuthLayout } from "@/components/Auth/AuthLayout";
import { FormInput } from "@/components/Form/FormInput";
import { authRepository } from "@/modules/auth/auth.repository";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUserStore = useCurrentUserStore();

  const signup = async () => {
    const user = await authRepository.signup(name, email, password);
    // 登録成功時にユーザーデータをストアに保存
    currentUserStore.set(user);
  };

  // 既にログインしている場合はホームへリダイレクト
  if (currentUserStore.currentUser) return <Navigate replace to="/" />;

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <FormInput
            id="username"
            label="ユーザー名"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <FormInput
            id="email"
            label="メールアドレス"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <FormInput
            id="password"
            label="パスワード"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            disabled={!name || !email || !password}
            onClick={signup}
            className="flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-900"
          >
            登録
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
