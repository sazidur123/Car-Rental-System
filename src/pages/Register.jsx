import React, { useState } from "react";
import { auth } from "../auth";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import DocumentTitle from "../hooks/DocumentTitle";

function Register() {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) =>
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    password.length >= 6;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error("Password must have at least 6 chars, uppercase and lowercase.");
      return;
    }
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, {
        displayName: name,
        photoURL: photoURL,
      });
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error("Registration failed. Try again.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      toast.success("Google sign-in successful!");
      navigate("/");
    } catch (error) {
      toast.error("Google sign-in failed: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md mx-auto">
        <DocumentTitle title="Car Rental | Register" />
        <h2 className="mb-3 text-3xl font-extrabold text-center text-indigo-700 drop-shadow">
          Register
        </h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 font-semibold text-indigo-600 hover:underline hover:text-red-600 transition"
          >
            Log in here
          </Link>
        </p>
        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photoURL}
            onChange={e => setPhotoURL(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-red-500 text-white font-bold text-lg shadow-lg hover:from-indigo-600 hover:to-red-600 transition-all duration-200 mt-2 flex items-center justify-center gap-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex items-center w-full my-4">
          <hr className="w-full border-gray-300" />
          <p className="px-3 text-gray-400">OR</p>
          <hr className="w-full border-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full p-3 rounded-full bg-gradient-to-r from-red-600 to-indigo-500 text-white font-semibold shadow hover:from-red-700 hover:to-indigo-600 transition-all duration-200 gap-3"
          disabled={loading}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 32 32">
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Register;