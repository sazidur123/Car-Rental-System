import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarDropdown, setAvatarDropdown] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully!");
    navigate("/");
    setMobileMenuOpen(false);
    setAvatarDropdown(false);
  };

  const handleNav = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    setAvatarDropdown(false);
  };

  // Theme toggle button
  const ThemeToggle = () => (
    <button
      className="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
      onClick={() => setDark((d) => !d)}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );

  // Dynamic text color classes
  const textColor = "text-red-800 dark:text-red-500";
  const menuTextColor = "text-red-900 dark:text-red-100";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 bg-base-100 shadow-sm h-16`}>
      <div className="flex items-center justify-between px-2 py-2 sm:px-4 md:px-6 h-16">
        {/* Logo & Title (left) */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <img
            src="/automobile-car-drive-ride-silhouette-styli-car-rental-logo-11563237916okmwcwglxx.png"
            alt="Logo"
            className="w-10 h-10 cursor-pointer"
            onClick={() => handleNav("/")}
          />
          <button
            onClick={() => handleNav("/")}
            className={`text-lg sm:text-xl font-semibold hidden md:inline-block ${textColor}`}
          >
            Car Rental Service
          </button>
        </div>

        {/* Center Nav (md+ only) */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-2 lg:space-x-4">
          <button onClick={() => handleNav("/")} className={`btn btn-ghost ${menuTextColor} hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 transition-colors`}>
            Home
          </button>
          <button onClick={() => handleNav("/available-cars")} className={`btn btn-ghost ${menuTextColor} hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 transition-colors`}>
            Available Cars
          </button>
          {user && (
            <>
              <button onClick={() => handleNav("/add-car")} className={`btn btn-ghost ${menuTextColor} hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 transition-colors`}>
                Add Car
              </button>
              <button onClick={() => handleNav("/my-cars")} className={`btn btn-ghost ${menuTextColor} hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 transition-colors`}>
                My Cars
              </button>
              <button onClick={() => handleNav("/my-bookings")} className={`btn btn-ghost ${menuTextColor} hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 transition-colors`}>
                My Bookings
              </button>
            </>
          )}
        </div>

        {/* Right Side (md+ only) */}
        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          {!user && (
            <>
              <Link to="/login" className={`btn btn-ghost ${menuTextColor}`}>
                Login
              </Link>
              <Link to="/register" className={`btn btn-ghost ${menuTextColor}`}>
                Register
              </Link>
            </>
          )}
          {user && (
            <div className="relative">
              <button
                className="btn btn-ghost btn-circle avatar"
                onClick={() => setAvatarDropdown((v) => !v)}
                tabIndex={0}
                onBlur={() => setTimeout(() => setAvatarDropdown(false), 150)}
                aria-label="Profile"
              >
                <div className="w-10 h-10 rounded-full">
                  <img
                    alt="Avatar"
                    src={user.photoURL || "/default-user.png"}
                  />
                </div>
              </button>
              {avatarDropdown && (
                <div className={`absolute right-0 mt-2 w-40 bg-base-100 rounded shadow-lg py-2 z-50`}>
                  <button
                    onMouseDown={() => handleNav("/profile")}
                    className={`block w-full text-left px-4 py-2 hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 ${menuTextColor} transition-colors`}
                  >
                    My Profile
                  </button>
                  <button
                    onMouseDown={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile: Theme, Avatar (if logged in), Hamburger */}
        <div className="flex items-center gap-2 md:hidden flex-shrink-0">
          <ThemeToggle />
          {user && (
            <div className="relative">
              <button
                className="btn btn-ghost btn-circle avatar p-0"
                onClick={() => setAvatarDropdown((v) => !v)}
                aria-label="Profile"
                style={{ minWidth: 40, minHeight: 40 }}
              >
                <div className="w-8 h-8 rounded-full">
                  <img
                    alt="User Avatar"
                    src={user.photoURL || "/default-user.png"}
                  />
                </div>
              </button>
              {avatarDropdown && (
                <div className="absolute right-0 mt-2 w-44 max-w-[90vw] bg-base-100 rounded shadow-lg py-2 z-50">
                  <button
                    onMouseDown={() => handleNav("/profile")}
                    className={`block w-full text-left px-4 py-2 truncate hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 ${menuTextColor} transition-colors`}
                  >
                    My Profile
                  </button>
                  <button
                    onMouseDown={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <button
            className="btn btn-ghost btn-circle p-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ minWidth: 40, minHeight: 40 }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-base-100 shadow-md px-2 py-2 w-full space-y-2">
          <button onClick={() => handleNav("/")} className={`btn btn-ghost w-full ${menuTextColor} hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 transition-colors`}>
            Home
          </button>
          <button onClick={() => handleNav("/available-cars")} className={`btn btn-ghost w-full ${menuTextColor} hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 transition-colors`}>
            Available Cars
          </button>
          {user && (
            <>
              <button onClick={() => handleNav("/add-car")} className={`btn btn-ghost w-full ${menuTextColor} hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 transition-colors`}>
                Add Car
              </button>
              <button onClick={() => handleNav("/my-cars")} className={`btn btn-ghost w-full ${menuTextColor} hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 transition-colors`}>
                My Cars
              </button>
              <button onClick={() => handleNav("/my-bookings")} className={`btn btn-ghost w-full ${menuTextColor} hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 transition-colors`}>
                My Bookings
              </button>
            </>
          )}
          {!user && (
            <>
              <button onClick={() => handleNav("/login")} className={`btn btn-ghost w-full ${menuTextColor}`}>
                Login
              </button>
              <button onClick={() => handleNav("/register")} className={`btn btn-ghost w-full ${menuTextColor}`}>
                Register
              </button>
            </>
          )}
        </div>
      )}
      {/* Mobile Avatar Dropdown (only My Profile & Logout) */}
      {user && avatarDropdown && (
        <div className="md:hidden absolute right-2 top-16 w-40 bg-base-100 rounded shadow-lg py-2 z-50">
          <button
            onMouseDown={() => handleNav("/profile")}
            className={`block w-full text-left px-4 py-2 hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 ${menuTextColor} transition-colors`}
          >
            My Profile
          </button>
          <button
            onMouseDown={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;