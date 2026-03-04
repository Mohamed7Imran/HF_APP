import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, LayoutDashboard, User } from "lucide-react";
import { api } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../auth/auth";

function Sidebar() {
  const [menus, setMenus] = useState([]);
  const [openMenus, setOpenMenus] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSidebar = async () => {
      try {
        const res = await api.get("/sidebar/");
        setMenus(res.data.menus || res.data);
        setUserName(res.data.user?.username || "Admin");
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
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // --- REUSABLE NAV LINK COMPONENT (Main Menu & Submenu Logic) ---
  const MenuContent = ({ isMobile = false }) => (
    <div className={`flex-1 overflow-y-auto no-scrollbar ${isMobile ? "px-4 pt-4 pb-24" : "px-3 space-y-1"}`}>
      {menus.map((menu) => (
        <div key={menu.id} className="mb-1">
          {/* Main Menu Item */}
          <div
            onClick={() => (menu.submenus?.length > 0 ? toggleSubMenu(menu.id) : (navigate(menu.path || "#"), isMobile && setMobileMenuOpen(false)))}
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 
              ${openMenus[menu.id] ? "bg-white/20 shadow-sm" : "hover:bg-white/10"}`}
          >
            <div className="flex items-center gap-4">
              {/* API ICON LOGIC: Image iruntha image, illana default icon */}
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                {menu.icon ? (
                  <img 
                    src={menu.icon} 
                    alt={menu.name} 
                    className="w-full h-full object-contain invert" // Invert makes black icons white to match theme
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
              <ChevronDown size={14} className={`transition-transform duration-300 ${openMenus[menu.id] ? "rotate-180" : ""}`} />
            )}
          </div>

          {/* Submenu rendering */}
          <div className={`overflow-hidden transition-all duration-300 bg-black/10 rounded-xl mt-1
            ${openMenus[menu.id] && (sidebarOpen || isMobile) ? "max-h-[500px] py-1" : "max-h-0"}`}
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
      ))}
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <style>
        {`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}
      </style>

      {/* --- MOBILE TOP BAR (Fixed Header) --- */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-emerald-600 text-white flex items-center justify-between px-5 z-[100] shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-black">HF</div>
          <span className="font-black tracking-tight uppercase text-sm">Hero Fashion</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="p-2 bg-white/10 rounded-lg"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* --- MOBILE SLIDE DRAWER --- */}
      <div className={`lg:hidden fixed inset-0 z-[95] transition-all duration-300 ${mobileMenuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMobileMenuOpen(false)} />
        <div className={`absolute top-0 left-0 bottom-0 w-[280px] bg-emerald-700 text-white shadow-2xl transition-transform duration-300 flex flex-col ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="h-16 flex items-center px-6 border-b border-white/10 bg-black/10">
            <span className="font-black text-sm tracking-widest">NAVIGATE</span>
          </div>
          <MenuContent isMobile={true} />
        </div>
      </div>

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className={`hidden lg:flex flex-col h-full bg-emerald-600 text-white transition-all duration-300 relative z-50 shadow-2xl ${sidebarOpen ? "w-64" : "w-20"}`}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-10 bg-white text-emerald-600 p-1.5 rounded-full shadow-lg z-50 hover:scale-110 transition-transform"
        >
          {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
        </button>

        <div className="h-20 flex items-center px-6 mb-2">
          <div className="min-w-[32px] h-8 bg-white/20 rounded flex items-center justify-center font-black text-xs border border-white/10">HF</div>
          {sidebarOpen && <span className="ml-3 text-sm font-black tracking-widest uppercase">Hero Fashion</span>}
        </div>

        <MenuContent />

        {/* User Profile Section */}
        <div className="p-4 border-t border-white/10 bg-black/5 flex items-center gap-3">
          <div className="w-8 h-8 min-w-[32px] rounded-full bg-white/20 flex items-center justify-center border border-white/10">
            <User size={16} />
          </div>
          {sidebarOpen && (
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col overflow-hidden">
                <span className="text-[12px] font-bold truncate">{userName}</span>
                <span className="text-[9px] text-emerald-200 uppercase font-black">Online</span>

              
              </div>
              <div>
                <button onClick={logoutUser} className="text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-1 rounded">
                Logout
              </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden pt-16 lg:pt-0">
        <main className="flex-1 overflow-y-auto p-2 md:p-2 pt-20 lg:pt-8 no-scrollbar">
           {/* Your Content Here */}
        </main>
      </div>
    </div>
  );
}

export default Sidebar;