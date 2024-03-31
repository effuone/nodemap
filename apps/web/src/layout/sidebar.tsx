import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
export default function Sidebar({ sidebarOpen, setSidebarOpen, onCreateMapClick }: any) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const sidebar = useRef(null);

  // Effect to add or remove a class to the body element based on sidebar expansion
  useEffect(() => {
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <>
      {/* Sidebar backdrop (visible on mobile only) */}
      <div
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed inset-0 z-40 border-r border-[#373737] bg-opacity-30 transition-opacity duration-200 sm:translate-x-0 lg:z-auto lg:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`no-scrollbar fixed left-0 top-0 z-40 flex h-screen shrink-0 flex-col overflow-y-scroll border-r border-[#373737] bg-[#212121] p-4 transition-all duration-200 sm:translate-x-0 lg:static lg:left-auto lg:top-auto ${
          sidebarExpanded ? "lg:w-20" : "lg:w-64"
        } ${
          sidebarOpen
            ? "w-72 translate-x-0"
            : "-translate-x-72 lg:translate-x-0"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between sm:px-2">
          <a href="/">
            <span
              className={`${
                sidebarExpanded ? "sm:hidden" : "block"
              }  welcome-step cursor-pointer whitespace-nowrap text-3xl font-semibold tracking-tighter text-white focus:outline-none focus:ring`}
            >
              Nodemap
              {/* <img
                className="h-100 mb-8 mt-2 w-32"
                src="/openai.png"
                height={32}
                width={300}
                alt="logo"
              /> */}
            </span>
          </a>

          {/* Sidebar Icon (Collapsed) */}
          <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
            <img src="https://i.imgur.com/XWRL4w7.png" className="h-3 w-3" />
          </button>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <div className="flex max-w-[215px] flex-col pt-3.5 text-center text-base font-semibold text-white">
            <div className="mt-3.5 flex w-full flex-col rounded-md bg-gradient-to-b from-violet-500 to-violet-800 px-2 pb-2">
              <img
                loading="lazy"
                src="https://i.imgur.com/HFsYEnm.png"
                className="z-10 mt-0 aspect-[1.47] w-32 max-w-full self-center"
              />
              <button
                  className={clsx(
                      sidebarExpanded ? "hidden" : "block",
                      "justify-center rounded bg-white px-12 py-1 text-[#161616]",
                  )}
                  onClick={onCreateMapClick}
              >
                Create a map
              </button>
            </div>
          </div>
          <hr className="my-3 border-[#373737]" />
          <div className="flex max-w-[215px] flex-col pb-2 text-base text-white">
            <div className="w-full text-xl font-bold">Maps</div>
            {sidebarExpanded ? (
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ec5cfcd267c67eec8c0921bdcdfe2a8b3b0a1774aaef53a2004052643b2b931?"
                className="mx-auto mt-2 aspect-square w-[18px] shrink-0 self-start fill-white "
              />
            ) : (
              <input
                type="text"
                placeholder="Search"
                className="mt-4 flex w-full justify-between gap-5 whitespace-nowrap rounded-md bg-white px-3 py-2 text-neutral-600"
              />
            )}
            <div
              className={clsx(
                sidebarExpanded ? "hidden" : "block",
                "mt-3.5 w-full items-start justify-center whitespace-nowrap rounded-md border border-solid border-neutral-700 px-3.5 py-2",
              )}
            >
              Front-end
            </div>
            <div className="mt-6 flex w-full flex-col items-start pl-3.5 pr-20">
              {sidebarExpanded ? (
                <div className="p-2">Br</div>
              ) : (
                <div>Baker</div>
              )}
              {sidebarExpanded ? (
                <div className="p-2">Ba</div>
              ) : (
                <div className="mt-8">Gardener</div>
              )}
              {sidebarExpanded ? (
                <div className="p-2">CS</div>
              ) : (
                <div className="mt-8">CSGO PLayer</div>
              )}
              {sidebarExpanded ? (
                <div className="p-2">Sk</div>
              ) : (
                <div className="mt-8">Skateboarding</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-3  lg:inline-flex ">
          <div className="flex-1" />
        </div>
      </div>
    </>
  );
}

