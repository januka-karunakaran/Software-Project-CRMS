import React from "react";
import { Icons } from "../constants";

const Header = ({
  title,
  subtitle,
  showNotifications,
  onToggleNotifications,
  onNavigateSettings,
  onLogout,
}) => {
  return (
    <header className="bg-gradient-to-r from-[#7c3aed] via-[#a78bfa] to-[#c084fc] h-[120px] flex items-center px-10 text-white shrink-0 shadow-md">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm border border-white/20">
            <Icons.Documents />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-0.5">
              {title}
            </h2>
            <p className="text-white/90 text-lg font-medium opacity-90">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
        </div>
      </div>
    </header>
  );
};

export default Header;
