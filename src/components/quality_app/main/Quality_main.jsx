import { Routes, Route } from "react-router-dom";
import Quality_admin from "../admin_control/Quality_admin";
import Qc from "../quality/Qc";
import LineDetail from "../quality/LineDetail"
import ProductionDetails from "../quality/ProductDetails"

function Quality_main() {
  return (
    <Routes>
      <Route path="/" element={<Quality_admin />} />
      <Route path="qc" element={<Qc />} />
      <Route path="line/:unit/:line" element={<LineDetail />} />
      <Route path="qc-entry/:unit/:line/first-piece" element={<ProductionDetails />} />
    </Routes>
  );
}

export default Quality_main;