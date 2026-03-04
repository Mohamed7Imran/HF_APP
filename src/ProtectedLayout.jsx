import Sidebar from "./Sidebar/Sidebar";

export default function ProtectedLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar /> {/* Always visible */}
      <div className="flex-1">
        {children} {/* Page content goes here */}
      </div>
    </div>
  );
}