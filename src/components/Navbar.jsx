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

  // Fixed text color for navbar buttons for best contrast
  const menuTextColor = "text-white dark:text-red-200";

  // Add margin, padding, and half-round effect for all nav buttons
  const buttonStyle = "px-2 py-2 mx-1 my-1 rounded-l-full rounded-r-full";

  return (
    <nav
      className={`sticky top-0 left-0 w-full z-50 bg-red-900 dark:bg-gray-900 shadow-sm h-16`}
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 md:px-10 py-2 h-16">
        {/* Logo & Title (left) */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <img
            src="/automobile-car-drive-ride-silhouette-styli-car-rental-logo-11563237916okmwcwglxx.png"
            alt="Logo"
            className="w-10 h-10 cursor-pointer rounded-full object-cover" // <-- Make logo round
            onClick={() => handleNav("/")}
          />
          <button
            onClick={() => handleNav("/")}
            className={`text-lg sm:text-xl font-semibold hidden md:inline-block text-white dark:text-red-400`}
          >
            Car Rental Service
          </button>
        </div>

        {/* Center Nav (md+ only) */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-2 lg:space-x-4">
          <button onClick={() => handleNav("/")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
            Home
          </button>
          <button onClick={() => handleNav("/available-cars")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
            Available Cars
          </button>
          {user && (
            <>
              <button onClick={() => handleNav("/add-car")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
                Add Car
              </button>
              <button onClick={() => handleNav("/my-cars")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
                My Cars
              </button>
              <button onClick={() => handleNav("/my-bookings")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
                My Bookings
              </button>
              <button onClick={() => handleNav("/about")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
                About
              </button>
            </>
          )}
          {!user && (
            <button onClick={() => handleNav("/about")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
              About
            </button>
          )}
        </div>

        {/* Right Side (md+ only) */}
        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          {!user && (
            <>
              <Link
                to="/login"
                className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}
              >
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
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    alt="Avatar"
                    src={user.photoURL || "/default-user.png"}
                    className="w-full h-full object-cover rounded-full" // <-- Make avatar round
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
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    alt="User Avatar"
                    src={user.photoURL || "/default-user.png"}
                    className="w-full h-full object-cover rounded-full" // <-- Make avatar round (mobile)
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
        <div className="md:hidden bg-base-100 shadow-md px-2 py-2 w-full flex flex-wrap gap-2 justify-center">
          <button onClick={() => handleNav("/")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
            Home
          </button>
          <button onClick={() => handleNav("/available-cars")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
            Available Cars
          </button>
          {user && (
            <>
              <button onClick={() => handleNav("/add-car")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
                Add Car
              </button>
              <button onClick={() => handleNav("/my-cars")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
                My Cars
              </button>
              <button onClick={() => handleNav("/my-bookings")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
                My Bookings
              </button>
              <button onClick={() => handleNav("/about")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
                About
              </button>
            </>
          )}
          {!user && (
            <button onClick={() => handleNav("/about")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
              About
            </button>
          )}
          {!user && (
            <>
              <button onClick={() => handleNav("/login")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
                Login
              </button>
              <button onClick={() => handleNav("/register")} className={`btn btn-ghost ${menuTextColor} hover:bg-gradient-to-r hover:from-red-600 hover:to-red-400 hover:text-white dark:hover:from-red-700 dark:hover:to-red-500 dark:hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 ${buttonStyle}`}>
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