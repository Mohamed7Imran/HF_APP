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
import CardGrid from '../order/Card.jsx';
// @import '@syncfusion/ej2-grids/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-grids/styles/material.css';
import Card1 from '../card/Card.jsx';
import Card2 from '../card/Card2.jsx';

// import '../css/style.css'

function Home() {
  return (
    <Routes>
        <Route path="/" element={<CardGrid />} />
        <Route path="/order" element={<HeroFashionGrid13 />} />
        <Route path="god/" element={<h1>Good</h1> } />
         <Route path="/HrReportGrid" element={<HrReportGrid />} /> 
         <Route path="/OrdPagination" element={<OrdPagination />} /> 
         {/* <Route path='/store' element= {<StoreGrid />} /> */}
         <Route path="/TallyBalanceReport" element={<TallyBalanceReport />} /> 
         <Route path="/OrdPagination" element={<OrdPagination />} /> 
         <Route path="/card1" element={<Card1 />} /> 
         <Route path="/card2" element={<Card2 />} /> 
        
    </Routes>
  );
}

export default Home;