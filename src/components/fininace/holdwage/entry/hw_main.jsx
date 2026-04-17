import { Routes, Route } from "react-router-dom";
import Home_hw from "../entry/home_hw";
import Hold from "../entry/hold";
import Report from "../reports/hw_report";
import Paid from "../reports/paid_report";

// Optional (create later if needed)


function Hw_main() {
  return (
    <Routes>
      {/* Default page */}
      <Route index element={<Home_hw />} />

      {/* Child routes */}
      <Route path="hold" element={<Hold />} />
      <Route path="report" element={<Report />} />
      <Route path="paid" element={<Paid />} />
    </Routes>
  );
}

export default Hw_main;