import Sidebar from "./Sidebar/Sidebar";
 
export default function ProtectedLayout({ children }) {
  return (
    <Sidebar children={children} />
  );
}