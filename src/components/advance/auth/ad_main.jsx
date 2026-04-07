import { Routes, Route } from "react-router-dom";
import Ad_login from "./auth/ad_login";
import Admin from "./admin"

function Ad_main() {
    return (
        <Routes>
            <Route path="/" element={<Ad_login />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    );
}
export default Ad_main;