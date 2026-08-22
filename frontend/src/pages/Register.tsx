import { useState } from "react";
import { authApi } from "../api/authApi";
import { Link,useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  async function submit() {
    await authApi.post("/auth/register", {
      email,
      password,
    });

    // navigate("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-300 via-blue-600 to-blue-950">
      <section className="w-[380px] rounded-2xl bg-white/10 px-10 py-12 text-white shadow-2xl backdrop-blur-xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white text-4xl">
          ✨
        </div>

        <h1 className="mb-10 text-center text-xl font-light tracking-[0.35em]">
          REGISTER
        </h1>

        <div className="mb-7 flex items-center gap-3 border-b border-white/80">
          <span>✉</span>

          <input
            className="w-full bg-transparent py-3 outline-none placeholder:text-white/80"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-8 flex items-center gap-3 border-b border-white/80">
          <span>🔒</span>

          <input
            className="w-full bg-transparent py-3 outline-none placeholder:text-white/80"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={submit}
          className="w-full bg-blue-950 py-3 tracking-[0.3em] transition hover:bg-blue-900"
        >
          CREATE ACCOUNT
        </button>

        <p className="mt-6 text-center text-sm text-white/80">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 font-medium text-white hover:underline"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}
