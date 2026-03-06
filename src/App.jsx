import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { startSilentRefresh, getRefreshToken } from "./auth/auth";

import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import User_list from "./components/user_control/User_list";
import ProtectedLayout from "./ProtectedLayout";
import MenuPage from "./components/user_control/MenuPage";
import SubMenuPermissionPage from "./components/user_control/SubMenuPermissionPage";
import QualityApp from "./components/quality_app/main/Quality_main"
import Qc_entry from "./components/quality_app/quality/Qc"
import Syncfushion from "./components/syncfushion/main/home"

function App() {

  useEffect(() => {
    const refreshToken = getRefreshToken();

    if (refreshToken) {
      startSilentRefresh(); // start refresh system when app loads
    }
  }, []);

  return (
    <HashRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD */}
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

        {/* USER LIST */}
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

        {/* MENU CONTROL */}
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

        {/* SUBMENU CONTROL */}
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

        <Route
          path="/sy-order/*"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Syncfushion />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/qc-admin/*"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <QualityApp />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/qc-entry/*"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Qc_entry />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </HashRouter>
  );
}

export default App;