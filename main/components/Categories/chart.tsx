import { SizeChartItem, sizeChart } from "@/data/chart";
import React from "react";

const SizeChartTable: React.FC<{ sizeChart: SizeChartItem[] }> = ({
  sizeChart,
}) => {
  return (
    <table className="table-auto border-collapse w-full text-center overflow-scroll">
      <thead>
        <tr>
          <th className="border">Category</th>
          <th className="border">Size</th>
          <th className="border">Brand Size</th>
          <th className="border">Chest/Waist/Hip (in inches)</th>
          <th className="border">Shoulder (in inches)</th>
          <th className="border">Length (in inches)</th>
          <th className="border">Inseam (in inches)</th>
          <th className="border">Outseam (in inches)</th>
        </tr>
      </thead>
      <tbody>
        {sizeChart.map((item, index) => (
          <tr key={index} className="text-center">
            <td className="border">{item.category}</td>
            <td className="border">{item.size}</td>
            <td className="border">{item.brandSize}</td>
            <td className="border">{item.chest || item.waist || item.hip}</td>
            <td className="border">{item.shoulder || "-"}</td>
            <td className="border">{item.length || "-"}</td>
            <td className="border">{item.inseam || "-"}</td>
            <td className="border">{item.outseam || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SizeChart: React.FC = () => {
  return (
    <div className="p-4 overflow-scroll max-h-96">
      <h1 className="text-2xl font-bold mb-4 text-center">Size Chart</h1>
      <SizeChartTable sizeChart={sizeChart} />
    </div>
  );
};

export default SizeChart;
