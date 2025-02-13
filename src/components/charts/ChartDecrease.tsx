"use client"

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
  },
  {
    name: 'Page B',
    uv: 2000,
  },
  {
    name: 'Page C',
    uv: 3000,
  },
  
  {
    name: 'Page G',
    uv: 1000,
  },
];

const ChartDecrease = () => {
  return (
    <ResponsiveContainer width="100%" height={110}>
      <AreaChart
        data={data}
      >
        <defs>
          <linearGradient id="colorDec" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F04438" stopOpacity={0.4}/>
            <stop offset="100%" stopColor="#FFFFF0" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="uv" stroke="#F04438" fill="url(#colorDec)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default ChartDecrease;
