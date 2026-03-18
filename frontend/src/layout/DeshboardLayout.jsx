import React, { useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import Navbar from "../component/Navbar";
import SideMenu from "../component/SideMenu";
import axios from 'axios';
import { apiEndpoints } from '../util/apiEndpoints';

function DashboardLayout({ children ,activeMenu}) {
  const { user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const register = async () => {
      if (!user) return;
      try {
        const token = await getToken();
        await axios.post(
          apiEndpoints.PROFILE + '/register',
          {
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            photoUrl: user.profileImageUrl,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (err) {
        console.error('Profile registration failed', err);
      }
    };

    register();
  }, [user, getToken]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex flex-1 overflow-hidden">

          {/* Desktop Sidebar */}
          <div className="hidden min-[1080px]:block w-64 bg-white border-r border-gray-200 overflow-y-auto">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
            {children}
          </div>

        </div>
      )}
    </div>
  );
}

export default DashboardLayout;