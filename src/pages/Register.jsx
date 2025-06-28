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
    <div className="max-w-md mx-auto p-6 mt-20 bg-white dark:bg-red-900 rounded-lg shadow">
      <DocumentTitle title="PlantCare | Register" />
      <h2 className="text-2xl text-center font-semibold mb-2">Register</h2>
      <p className="text-sm mb-6 text-gray-700 dark:text-gray-200 text-center">
        Already have an account?
        <Link to="/login" className="text-red-800 ml-1 hover:underline">
          Log in here
        </Link>
      </p>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photoURL}
          onChange={e => setPhotoURL(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-700 mb-4"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="text-center text-gray-500 mb-2">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
        disabled={loading}
      >
        Continue with Google
      </button>
    </div>
  );
}

export default Register;