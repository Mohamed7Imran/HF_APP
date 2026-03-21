import { useContext, useState, useEffect } from "react";
import { ChevronDown, Menu, X, LayoutDashboard, User } from "lucide-react";
import { api } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../auth/auth";

import { UserContext } from "../UserContext";


function Sidebar({ children }) {
  const [menus, setMenus] = useState([]);
  const [openMenus, setOpenMenus] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { setUsername } = useContext(UserContext); // update global context

  const navigate = useNavigate();

 useEffect(() => {
  const fetchSidebar = async () => {
    try {
      const res = await api.get("/sidebar/");
      setMenus(res.data.menus || []);
      setUserName(res.data.user?.username || "Admin");
      setUsername(res.data.user?.username || "Admin"); // global context
    } catch (err) {
      console.error("Sidebar API error:", err);
    }
  };

  fetchSidebar();


    const handleResize = () => {
      if (window.innerWidth < 1024) setSidebarOpen(false);
      else setSidebarOpen(true);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSubMenu = (id) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /* ---------------- GLOBAL FILTER LOGIC ---------------- */

  const filteredMenus = menus
  .map((menu) => {
    const menuMatch = menu.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchedSubmenus = menu.submenus?.filter((sub) =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Main menu match -> show all submenus
    if (menuMatch) {
      return {
        ...menu,
        submenus: menu.submenus,
      };
    }

    // Submenu match -> show only matched submenu
    if (matchedSubmenus?.length > 0) {
      return {
        ...menu,
        submenus: matchedSubmenus,
      };
    }

    return null;
  })
  .filter(Boolean);

  /* ---------------- MENU COMPONENT ---------------- */

  const MenuContent = ({ isMobile = false }) => (
    <div
      className={`flex-1 overflow-y-auto no-scrollbar ${
        isMobile ? "px-4 pt-4 pb-24" : "px-3 space-y-1"
      }`}
    >
      {filteredMenus.map((menu) => {
        const isOpen =
          openMenus[menu.id] ||
          (searchTerm && menu.submenus?.length > 0);

        return (
          <div key={menu.id} className="mb-1">
            {/* Main Menu */}
            <div
              onClick={() =>
                menu.submenus?.length > 0
                  ? toggleSubMenu(menu.id)
                  : (navigate(menu.path || "#"),
                    isMobile && setMobileMenuOpen(false))
              }
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300
              ${isOpen ? "bg-white/20 shadow-sm" : "hover:bg-white/10"}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {menu.icon ? (
                    <img
                      src={menu.icon}
                      alt={menu.name}
                      className="w-full h-full object-contain invert"
                    />
                  ) : (
                    <LayoutDashboard size={20} className="text-white" />
                  )}
                </div>

                {(sidebarOpen || isMobile) && (
                  <span className="font-bold text-[13px] tracking-wide whitespace-nowrap">
                    {menu.name}
                  </span>
                )}
              </div>

              {menu.submenus?.length > 0 && (sidebarOpen || isMobile) && (
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {/* Submenus */}
            <div
              className={`overflow-hidden transition-all duration-300 bg-black/10 rounded-xl mt-1
              ${
                isOpen && (sidebarOpen || isMobile)
                  ? "max-h-[500px] py-1"
                  : "max-h-0"
              }`}
            >
              {menu.submenus?.map((sub) => (
                <div
                  key={sub.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(sub.path);
                    if (isMobile) setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 pl-12 py-2.5 text-[12px] font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  {sub.name}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {filteredMenus.length === 0 && (
        <div className="text-center text-white/70 text-sm mt-10">
          No menu found
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <style>
        {`.no-scrollbar::-webkit-scrollbar { display:none }`}
      </style>

      {/* --- MOBILE TOP BAR (Fixed Header) --- */}
     
        <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-cyan-700 text-white flex items-center justify-between px-5 z-[100] shadow-md flex-row-reverse">
        <div className="flex items-center gap-6">
         
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-40 px-2 py-1 text-sm text-black rounded-md border border-white focus:outline-none"
          />

          <span className="font-black tracking-tight uppercase text-sm">
            Hero Fashion
          </span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-white/10 rounded-lg"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* ---------------- MOBILE SIDEBAR ---------------- */}

      <div
        className={`lg:hidden fixed inset-0 z-[95] transition-all duration-300 ${
          mobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-0 left-0 bottom-0 w-[280px] bg-cyan-700 text-white shadow-2xl transition-transform duration-300 flex flex-col ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-16 flex items-center px-6 border-b border-white/10 bg-black/10">
            <span className="font-black text-sm tracking-widest">
              NAVIGATE
            </span>
          </div>

          <MenuContent isMobile={true} />
        </div>
      </div>

      {/* ---------------- DESKTOP SIDEBAR ---------------- */}

      <aside
        className={`hidden lg:flex flex-col h-full bg-cyan-700 text-white transition-all duration-300 relative z-50 shadow-2xl ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="h-20 flex items-center px-6 mb-2 gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {sidebarOpen && (
            <span className="text-sm font-black tracking-widest uppercase">
              Hero Fashion
            </span>
          )}
        </div>

        {/* SEARCH BAR */}
        {sidebarOpen && (
          <div className="px-4 mb-3">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-md text-white border-2 border-white focus:outline-none focus:border-white"
            />
          </div>
        )}

        <MenuContent />

        {/* USER PROFILE */}

        <div className="p-4 border-t border-white/10 bg-black/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <User size={16} />
          </div>

          {sidebarOpen && (
            <div className="flex items-center justify-between w-full">
              <div>
                <span className="text-[12px] font-bold">{userName}</span>
                <div className="text-[9px] text-emerald-200 uppercase">
                  Online
                </div>
              </div>

              <button
                onClick={logoutUser}
                className="text-xs bg-cyan-700 hover:bg-blue-600 px-2 py-1 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* CONTENT */}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden pt-16 lg:pt-0">
        <main className="flex-1 overflow-y-auto pt-20 lg:pt-8 no-scrollbar">
          {/* Your Content */}
        </main>
      </div>
    </div>
  );
}

export default Sidebar;