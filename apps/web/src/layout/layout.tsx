import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCreateMapClick = () => {
    console.log("Create a map clicked");
  };

  return (
        <div className={`flex ${isMobile ? "" : "lg:flex-row"}`}>
        {isMobile ? (
          sidebarOpen && (
              <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  onCreateMapClick={handleCreateMapClick}
              />
          )
        ) : (
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                onCreateMapClick={handleCreateMapClick}
            />
        )}

        {/* Main content area */}
        <div className="flex-1">
          {isMobile && (
            <Header
              setSidebarOpen={setSidebarOpen}
              className="sticky top-0 z-30 border-b border-slate-200 bg-white"
            />
          )}
          {/* Adjusting for screen sizes and sidebar state */}
          <main
            className={`h-screen overflow-y-auto ${isMobile && sidebarOpen ? "ml-[300px]" : ""}`}
          >
            {children}
          </main>
        </div>
      </div>
  );
}
