import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card } from "react-bootstrap";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 7000 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 8000 },
];

const GradientBarChart = () => {
  return (
    <Card className="p-3 shadow">
      <h5 className="text-center">Sales Report</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          {/* Background Grid */}
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* X and Y Axis */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#007bff" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#00c6ff" stopOpacity={0.8} />
            </linearGradient>
          </defs>

          {/* Bar Chart with Gradient */}
          <Bar dataKey="sales" fill="url(#colorGradient)" barSize={40} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default GradientBarChart;
