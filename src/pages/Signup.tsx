import { useState } from "react";
import { Navigate } from "react-router-dom";

import { AuthLayout } from "@/components/Auth/AuthLayout";
import { FormInput } from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";
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
          <Button
            disabled={!name || !email || !password}
            onClick={signup}
            className="w-full"
          >
            登録
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
