import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { AuthLayout } from "@/components/Auth/AuthLayout";
import { FormInput } from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";
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
          <Button
            disabled={!email || !password}
            onClick={signin}
            className="w-full"
          >
            ログイン
          </Button>
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
