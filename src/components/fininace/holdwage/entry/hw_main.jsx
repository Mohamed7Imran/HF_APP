import { Route } from "react-router-dom";
import Home_hw from "../entry/home_hw";
import Hold from "../entry/hold"




function Hw_main() {
    return (
        <Routes>
            <Route path="/" element={<Home_hw />} />
            {/* <Route path="hold" element={<Hold />} /> */}
        </Routes>
    );
}

export default Hw_main;