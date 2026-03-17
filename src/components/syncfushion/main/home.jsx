import {  Routes, Route, } from 'react-router-dom';
import HeroFashionGrid13 from "../order/ord_order.tsx"
import HrReportGrid from "../order/ord1 ok.tsx"
import TallyBalanceReport from "../order/tally.tsx"
import OrdPagination from "../order/ord_pagination.tsx"
import PrnReportGrid from "../order/print.tsx"
import CardGrid from './Card.jsx';
import { App } from '../order/SyncGrid.tsx';
import Card1 from '../order/card/Card.jsx';
import Card2 from '../order/card/Card2.jsx';
import Sample from '../order/Sample.tsx';
import StoreGrid from '../order/StoreGrid.tsx';
import MultiQuality from '../order/MultiQuality.jsx';

import PRN from '../order/ord_prn.tsx';
import Excel from '../order/excel.tsx';
import FabricForm from '../fabric/Fabric.jsx';
import Signin1 from '../layout/Signup.tsx';
import OrderOms from "../order/Order_oms.tsx"
import Schedule from "../order/Schedule.tsx"
import GanttChart from '../order/Gantt Chart/GanttChart.tsx';

// import Overview from "../order/chart.tsx"

function Home() {
  return (
    <Routes>
        <Route path="/" element={<CardGrid />} />
        <Route path="/order" element={<HeroFashionGrid13 />} />
        <Route path="god/" element={<h1>Good</h1> } />
        <Route path="/HrReportGrid" element={<HrReportGrid />} /> 
        <Route path="/OrdPagination" element={<OrdPagination />} /> 
        <Route path='/store' element= {<StoreGrid />} />
        <Route path="/TallyBalanceReport" element={<TallyBalanceReport />} /> 
        <Route path="/OrdPagination" element={<OrdPagination />} /> 
        <Route path="/PrnReportGrid" element={<PrnReportGrid />} /> 
        <Route path="/card1" element={<Card1 />} /> 
        <Route path="/card2" element={<Card2 />} /> 
        <Route path="/sync" element={<App />} /> 
        <Route path="/sample" element={<Sample />} /> 
        <Route path="/mulitquality" element={<MultiQuality/>} />
        
         <Route path="/HrReportGrid" element={<HrReportGrid />} /> 
         <Route path="/OrdPagination" element={<OrdPagination />} /> 
         <Route path='/store' element= {<StoreGrid />} />
         <Route path="/TallyBalanceReport" element={<TallyBalanceReport />} /> 
         <Route path="/OrdPagination" element={<OrdPagination />} /> 
         <Route path="/PrnReportGrid" element={<PrnReportGrid />} /> 
         <Route path="/Schedule" element={<Schedule />} /> 
         <Route path="/card1" element={<Card1 />} /> 
         <Route path="/card2" element={<Card2 />} /> 
         <Route path="/sync" element={<App />} /> 
         <Route path="/sample" element={<Sample />} /> 
         <Route path="/PRN" element={<PRN />} /> 
         <Route path="/Excel" element={<Excel />} /> 
         {/* <Route path="/Overview" element={<Overview />} />  */}
         <Route path="/fabric" element={<FabricForm />} /> 
         <Route path='/signup' element={<Signin1 />} />
        <Route path='/order_oms' element={<OrderOms />} />
        <Route path='/chart' element={<GanttChart />} />
    </Routes>
  );
}

export default Home;
