import React from "react";
import { useUser } from "@clerk/clerk-react";
import { User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { SIDE_MENU_DATA } from "../assets/sidemenudata";

function SideMenu({ onClose }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose(); // close mobile menu if exists
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200 p-5 sticky top-[61px] z-20 overflow-y-auto">

      {/* ================= USER INFO ================= */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-8">
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
        ) : (
          <User className="w-20 h-20 text-gray-400" />
        )}

        <h5 className="text-gray-900 font-medium text-center">
          {user?.fullName || "User"}
        </h5>

        <p className="text-sm text-gray-500 text-center">
          {user?.primaryEmailAddress?.emailAddress || ""}
        </p>
      </div>

      {/* ================= MENU ITEMS ================= */}
      <div className="flex flex-col">
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={`menu_${index}`}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 text-[15px] py-3 px-4 rounded-lg mb-2 transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SideMenu;