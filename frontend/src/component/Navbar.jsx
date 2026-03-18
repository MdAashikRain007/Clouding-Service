import React, { useState, useEffect } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Menu, X, Share } from "lucide-react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import CreditDisplay from "./CreditDisplay";
import { useCredits } from "../context/CreditsContext";

const Navbar = ({activeMenu}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { credits } = useCredits();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (openSideMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openSideMenu]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div className="flex items-center justify-between bg-white border-b border-gray-200 px-4 sm:px-7 py-4 sticky top-0 z-40">

        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpenSideMenu(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Share className="text-blue-600" size={22} />
            <span className="text-lg font-semibold text-black">
              Cloud Share
            </span>
          </div>
        </div>

        {/* Right Side */}
        <SignedIn>
          <div className="flex items-center gap-4">

            {/* Credits */}
            <Link to="/subscriptions">
              <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-blue-100 transition">
               <CreditDisplay credits={credits ?? 0}/>
              </div>
            </Link>

            {/* User Button */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>

        <SignedOut>
          <Link
            to="/sign-in"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </SignedOut>
      </div>

      {/* ================= MOBILE SIDE MENU ================= */}
      {openSideMenu && (
        <>
          {/* Overlay Background */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setOpenSideMenu(false)}
          />

          {/* Side Drawer */}
          <div className="fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 lg:hidden transform transition-transform duration-300">

            {/* Close Button */}
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-semibold text-lg">Menu</span>
              <button
                onClick={() => setOpenSideMenu(false)}
                className="p-2 rounded hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>

            {/* Side Menu Content */}
            <div className="p-4">
              <SideMenu onClose={() => setOpenSideMenu(false)} activeMenu={activeMenu}/>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;