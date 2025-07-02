import React, { useRef, useState } from "react";
import { auth } from "../auth";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DocumentTitle from "../hooks/DocumentTitle";
import { getIdToken } from "firebase/auth";
import Cookies from "js-cookie";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      const user = userCredential.user;
      localStorage.setItem("userId", user.uid);
      const token = await getIdToken(user, true);
      Cookies.set("token", token, { secure: true, sameSite: "strict" });

      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      toast.error("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;
      localStorage.setItem("userId", user.uid);
      const token = await getIdToken(user, true);
      Cookies.set("token", token, { secure: true, sameSite: "strict" });

      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      setError("Google sign in failed.");
      toast.error("Google sign in failed.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md mx-auto">
        <DocumentTitle title="Car Rental | Login" />
        <h2 className="mb-3 text-3xl font-extrabold text-center text-indigo-700 drop-shadow">
          Login to your account
        </h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          Don’t have an account?
          <Link
            to="/register"
            className="ml-1 font-semibold text-indigo-600 hover:underline hover:text-red-600 transition"
          >
            Sign up here
          </Link>
        </p>

        <div className="my-6 space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full p-3 rounded-full bg-gradient-to-r from-red-600 to-indigo-500 text-white font-semibold shadow hover:from-red-700 hover:to-indigo-600 transition-all duration-200 gap-3"
            type="button"
            disabled={loading}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 32 32">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
            </svg>
            <span>Login with Google</span>
          </button>
        </div>

        <div className="flex items-center w-full my-4">
          <hr className="w-full border-gray-300" />
          <p className="px-3 text-gray-400">OR</p>
          <hr className="w-full border-gray-300" />
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email address
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                placeholder="Email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="space-y-2 relative">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-indigo-500 hover:underline"
                  onClick={() => setIsForgotPassword(true)}
                >
                  Forgot password?
                </button>
              </div>
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-lg text-gray-500 hover:text-indigo-600 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-red-500 text-white font-bold text-lg shadow-lg hover:from-indigo-600 hover:to-red-600 transition-all duration-200 mt-2 flex items-center justify-center gap-2"
          >
            {loading ? "Logging in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
