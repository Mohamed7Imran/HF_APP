import {  Routes, Route, } from 'react-router-dom';
import HeroFashionGrid13 from "../order/ord_order.tsx"
import HrReportGrid from "../order/ord1 ok.tsx"
import TallyBalanceReport from "../order/tally.tsx"
import OrdPagination from "../order/ord_pagination.tsx"
// import HrReportGrid from "../order/ord1 ok.tsx"
// const HrReportGrid = React.lazy(() => import('../order/ord1 ok'));
// // const StoreGrid = React.lazy(() => import('../page/order/StoreGrid'));
// const TallyBalanceReport = React.lazy(() => import('../order/tally'));


import '../../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-popups/styles/material.css';

import '../../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-grids/styles/material.css';

// import '../css/style.css'

function Home() {
  return (
    <Routes>
        <Route path="" element={<HeroFashionGrid13 />} />
        <Route path="god/" element={<h1>Good</h1> } />
         <Route path="/HrReportGrid" element={<HrReportGrid />} /> 
         {/* <Route path='/store' element= {<StoreGrid />} /> */}
         <Route path="/TallyBalanceReport" element={<TallyBalanceReport />} /> 
         <Route path="/OrdPagination" element={<OrdPagination />} /> 
        
    </Routes>
  );
}

export default Home;