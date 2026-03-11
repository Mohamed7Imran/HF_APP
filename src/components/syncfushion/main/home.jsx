import {  Routes, Route, } from 'react-router-dom';
import HeroFashionGrid13 from "../order/ord_order.tsx"
import HrReportGrid from "../order/ord1 ok.tsx"
import TallyBalanceReport from "../order/tally.tsx"
import OrdPagination from "../order/ord_pagination.tsx"
import PrnReportGrid from "../order/print.tsx"
import CardGrid from '../order/Card.jsx';
import { App } from '../order/SyncGrid.tsx';
import Card1 from '../card/Card.jsx';
import Card2 from '../card/Card2.jsx';
import Sample from '../order/Sample.tsx';


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
         <Route path="/PrnReportGrid" element={<PrnReportGrid />} /> 
         <Route path="/card1" element={<Card1 />} /> 
         <Route path="/card2" element={<Card2 />} /> 
         <Route path="/sync" element={<App />} /> 
         <Route path="/sample" element={<Sample />} /> 
        
    </Routes>
  );
}

export default Home;