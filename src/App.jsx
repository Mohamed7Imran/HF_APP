import { BrowserRouter,HashRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { startSilentRefresh, getRefreshToken } from "./auth/auth";

import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import User_list from "./components/user_control/User_list";
import ProtectedLayout from "./ProtectedLayout";
import MenuPage from "./components/user_control/MenuPage";
import SubMenuPermissionPage from "./components/user_control/SubMenuPermissionPage";

function App() {
  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      startSilentRefresh(); // ✅ important
    }
  }, []);

  return (
    
     <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-list"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <User_list />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu-control"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <MenuPage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/submenu-control"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <SubMenuPermissionPage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
      </HashRouter>
    
  );
}

export default App;