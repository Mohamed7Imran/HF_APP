import React from "react";
import { FaChartPie, FaCheck, FaWallet, FaViadeo, FaAudible, FaDribbble } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

        {/* Card 1 */}
        <div
          onClick={() => navigate("order")}
          className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden 
          transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>

          <div className="w-14 h-14 flex items-center justify-center bg-orange-100 rounded-xl mb-4 
          group-hover:rotate-12 transition duration-300">
            <FaViadeo className="text-orange-500 text-2xl" />
          </div>

          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition">
            Order syncfushion
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Manage the Grid and datas
          </p>
        </div>


        {/* Card 2 */}
        <div
          onClick={() => navigate("HrReportGrid")}
          className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden 
          transform hover:scale-105z hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>

          <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-xl mb-4 
          group-hover:rotate-12 transition duration-300">
            <FaChartPie className="text-blue-500 text-2xl" />
          </div>

          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
            Hr
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Working Status
          </p>
        </div>


        {/* Card 3 */}
        <div
          onClick={() => navigate("card1")}
          className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden 
          transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>

          <div className="w-14 h-14 flex items-center justify-center bg-green-100 rounded-xl mb-4 
          group-hover:rotate-12 transition duration-300">
            <FaCheck className="text-green-500 text-2xl" />
          </div>

          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition">
            Order Card
          </h2>

          <p className="text-gray-500 text-sm mt-1">
           Card view and details
          </p>
        </div>


        {/* Card 4 */}
        <div
          onClick={() => navigate("card2")}
          className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden 
          transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>

          <div className="w-14 h-14 flex items-center justify-center bg-purple-100 rounded-xl mb-4 
          group-hover:rotate-12 transition duration-300">
            <FaWallet className="text-purple-500 text-2xl" />
          </div>

          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition">
            Order Card Detail
          </h2>

          <p className="text-gray-500 text-sm mt-1">
           Overall card details
          </p>
        </div>
        
        {/* Card 5 */}
        <div
          onClick={() => navigate("PrnReportGrid")}
          className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden 
          transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>

          <div className="w-14 h-14 flex items-center justify-center bg-red-100 rounded-xl mb-4 
          group-hover:rotate-12 transition duration-300">
            <FaAudible className="text-red-500 text-2xl" />
          </div>

          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition">
            Printing
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Printing Details
          </p>
        </div>

        {/* Card 6 */}
        <div
          onClick={() => navigate("sync")}
          className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden 
          transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>

          <div className="w-14 h-14 flex items-center justify-center bg-pink-100 rounded-xl mb-4 
          group-hover:rotate-12 transition duration-300">
            <FaDribbble className="text-pink-500 text-2xl" />
          </div>

          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition">
            Syncfusion Grid
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Update Grid
          </p>
        </div>

        {/* Card 7 */}
        <div
          onClick={() => navigate("sample")}
          className="group cursor-pointer bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden 
          transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-40 group-hover:scale-150 transition duration-500"></div>

          <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-xl mb-4 
          group-hover:rotate-12 transition duration-300">
            <FaViadeo className="text-blue-500 text-2xl" />
          </div>

          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
            Sample Grid
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Update Grid
          </p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
