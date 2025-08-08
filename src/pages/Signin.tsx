import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { AuthLayout } from "@/components/Auth/AuthLayout";
import { FormInput } from "@/components/Form/FormInput";
import { authRepository } from "@/modules/auth/auth.repository";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUserStore = useCurrentUserStore();

  const signin = async () => {
    const user = await authRepository.signin(email, password);
    // ログイン成功時にユーザーデータをストアに保存
    currentUserStore.set(user);
  };

  // 既にログインしている場合はホームへリダイレクト
  if (currentUserStore.currentUser) return <Navigate replace to="/" />;

  return (
    <AuthLayout>
      <div className="space-y-6">
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
            disabled={!email || !password}
            onClick={signin}
            className="flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-900"
          >
            ログイン
          </button>
        </div>
        <div className="mt-4 text-center text-sm">
          登録は
          <Link className="underline" to="/signup">
            こちら
          </Link>
          から
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signin;
