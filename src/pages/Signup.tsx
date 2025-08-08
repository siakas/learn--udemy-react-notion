import { useState } from "react";
import { authRepository } from "@/modules/auth/auth.repository";

import { FormInput } from "@/components/Form/FormInput";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ストア呼び出し

  const signup = async () => {
    const user = await authRepository.signup(name, email, password);
    console.log("ユーザー登録成功:", user);
    // ストアの存在チェック
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Notionクローン
        </h2>
        <div className="mt-8 w-full max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
