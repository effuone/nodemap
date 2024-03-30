"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State to track if the viewport is in mobile mode
  const [isMobile, setIsMobile] = useState(false);

  // Effect to handle resizing and update isMobile state accordingly
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    // Initial resize check and event listener setup
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup: remove event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div>
        {/* Render the Sidenav component */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      <div className="relative flex flex-1 flex-col lg:overflow-y-auto lg:overflow-x-hidden">
        {/* Render the Header component if in mobile mode */}
        {isMobile && (
          <Header
            setSidebarOpen={setSidebarOpen}
            className="sticky top-0 z-30 border-b border-slate-200 bg-white"
          />
        )}
        {/* Render the main content */}
        <main>{children}</main>
      </div>
    </>
  );
}
