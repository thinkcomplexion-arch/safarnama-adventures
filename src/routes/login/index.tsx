import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "sonner";

export const Route = createFileRoute("/login/")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
  e.preventDefault();

  try {
    setLoading(true);

    alert("1. Login started");

    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("2. Firebase login successful: " + result.user.uid);

    toast.success("Login successful");

    alert("3. Going to admin");

    navigate({
      to: "/admin",
    });

  } catch (error: any) {
    alert(
      "LOGIN ERROR\n\n" +
      error.code +
      "\n\n" +
      error.message
    );

  } finally {
    setLoading(false);
  }
  }
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-teal-500 px-4">

      {/* Background blur effects */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Safarnama
          </h1>

          <p className="mt-2 text-sm text-white/80">
            Management Portal
          </p>
        </div>


        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm text-white/90">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none transition focus:border-white/50"
              required
            />
          </div>


          <div>
            <label className="mb-2 block text-sm text-white/90">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none transition focus:border-white/50"
              required
            />
          </div>


          <button
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 font-semibold text-purple-700 transition hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>


        <p className="mt-6 text-center text-xs text-white/70">
          Authorized personnel only
        </p>

      </div>

    </div>
  );
}
