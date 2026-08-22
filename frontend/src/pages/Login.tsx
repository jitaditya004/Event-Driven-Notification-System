import { useState } from "react";
import { authApi } from "../api/authApi";
import { Link,useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit() {
    await authApi.post("/auth/login", {
      email,
      password,
    });

    navigate("/notifications");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-300 via-blue-600 to-blue-950">
      <section className="w-95 rounded-2xl bg-white/10 backdrop-blur-xl px-10 py-12 text-white shadow-2xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white text-4xl">
          👤
        </div>

        <h1 className="mb-10 text-center text-xl font-light tracking-[0.35em]">
          LOGIN
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

        <div className="mb-5 flex items-center gap-3 border-b border-white/80">
          <span>🔒</span>

          <input
            className="w-full bg-transparent py-3 outline-none placeholder:text-white/80"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-8 flex items-center justify-between text-xs">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <button className="hover:underline">Forgot Password?</button>
        </div>

        <button
          onClick={submit}
          className="w-full bg-blue-950 py-3 tracking-[0.3em] transition hover:bg-blue-900"
        >
          LOGIN
        </button>

        <p className="mt-6 text-center text-sm text-white/80">
          Don't have an account?
          <Link
            to="/register"
            className="ml-1 font-medium text-white hover:underline"
          >
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}
