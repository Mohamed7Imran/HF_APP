import React from "react";
import { useNavigate } from "react-router-dom";


const Card = ({ title }) => {

  const navigate= useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">Grid Details</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded"
      onClick={()=>{navigate("order")}}>
        Open
      </button>
    </div>
  );
};

const CardGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      <Card title="Order" />
      <Card title="Grid-order" />
      <Card title="Syncfusion" />
      <Card title="Bala" />
    </div>
  );
};

export default CardGrid;