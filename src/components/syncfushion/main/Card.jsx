import React from "react";
import { 
  FaChartPie, FaCheck, FaWallet, FaViadeo, FaAudible, 
  FaDribbble, FaRegSmileWink, FaTencentWeibo, FaMixcloud,
  FaCodepen, FaAirbnb, FaDove, FaPushed, FaRaspberryPi,
  FaRegPaperPlane, FaVirus, 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-5 flex flex-col">

      {/* Breadcrumb */}
      <ol className="flex items-center whitespace-nowrap p-6 flex-shrink-0">
        <li className="inline-flex items-center">
          <a className="flex items-center text-sm text-muted-foreground-1 hover:text-primary-focus focus:outline-hidden focus:text-primary-focus" href="/#/dashboard">
            <svg className="shrink-0 me-3 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Dashboard
          </a>
          <svg className="shrink-0 mx-2 size-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </li>
        <li className="inline-flex items-center">
          <a className="flex items-center text-sm text-muted-foreground-1 hover:text-primary-focus focus:outline-hidden focus:text-primary-focus" href="/#/sy-order">
            <svg className="shrink-0 me-3 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="7" height="7" x="14" y="3" rx="1"/>
              <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"/>
            </svg>
            Order
            <svg className="shrink-0 mx-2 size-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        </li>
      </ol>

      {/* Cards container */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          {/* Card 1 */}
          <div
            onClick={() => navigate("order")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden 
            transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-orange-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaViadeo className="text-orange-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition">
              Order syncfushion - B,K,D
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage the Grid and datas
            </p>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => navigate("HrReportGrid")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaChartPie className="text-blue-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
              Hr - B
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Working Status
            </p>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => navigate("card1")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-green-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaCheck className="text-green-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition">
              Order Card - K 
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Card view and details
            </p>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => navigate("card2")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-purple-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaWallet className="text-purple-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition">
              Order Card Detail - K 
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Overall card details
            </p>
          </div>

          {/* Card 5 */}
          <div className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-red-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaAudible className="text-red-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition">
              Printing - Waiting
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Printing Details
            </p>
          </div>

          {/* Card 6 */}
          <div
            onClick={() => navigate("sync")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-pink-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaDribbble className="text-pink-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition">
              Syncfusion Grid - K
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Update Grid
            </p>
          </div>

          {/* Card 7 */}
          <div
            onClick={() => navigate("sample")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-amber-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaRegSmileWink className="text-amber-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-amber-600 transition">
              Sample Grid - K
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Update Grid
            </p>
          </div>

          {/* Card 8 */}
          <div
            onClick={() => navigate("store")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-indigo-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaTencentWeibo className="text-indigo-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
              StoreGrid - K
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Tbuyer and Torder Details
            </p>
          </div>

          {/* Card 9 */}
          <div
            onClick={() => navigate("fabric")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-emerald-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaMixcloud className="text-emerald-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition">
              Fabric - K 
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Fabric Alias Form
            </p>
          </div>

          {/* Card 10 */}
          <div
            onClick={() => navigate("Excel")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-fuchsia-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-fuchsia-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaCodepen className="text-fuchsia-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-fuchsia-600 transition">
              Order Oms - K
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              oms data using store procedure 
            </p>
          </div>

          {/* Card 11 */}
          <div
            onClick={() => navigate("PRN")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-sky-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaVirus className="text-sky-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-sky-600 transition">
              Prn Details
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Print order Details
            </p>
          </div>

          {/* Card 12 */}
          <div
            onClick={() => navigate("order_oms")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-cyan-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaRegPaperPlane className="text-cyan-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-cyan-600 transition">
              Order Oms1
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Order detail using store procedure
            </p>
          </div>

          {/* Card 13 */}
          <div
            onClick={() => navigate("Schedule")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaRaspberryPi className="text-blue-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
              Calenda Details
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Calen order Details
            </p>
          </div>
          {/* Card 14 */}
          <div
            onClick={() => navigate("Schedule")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-orange-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              < FaPushed className="text-orange-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition">
              Calenda Details
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Calen order Details
            </p>
          </div>
         {/* Card 15 */}
           <div
            onClick={() => navigate("SyncordGrid")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-purple-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaDove className="text-purple-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition">
              SyncordGrid
            </h2>
            <p className="text-gray-500 text-sm mt-1">
            SyncordGrid
            </p>
          </div>
         {/* Card 16 */}
           <div
            onClick={() => navigate("chart")}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>
            <div className="w-14 h-14 flex items-center justify-center bg-green-100 rounded-xl mb-4 group-hover:rotate-12 transition duration-300">
              <FaAirbnb className="text-green-500 text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition">
              Gantt Chart
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Details about Gantt Chart
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;