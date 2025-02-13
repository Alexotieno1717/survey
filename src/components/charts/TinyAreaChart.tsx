"use client"

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 1000,
    pv: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
  },
  
  {
    name: 'Page G',
    uv: 4000,
    pv: 4300,
  },
];

const TinyAreaChart = () => {
  return (
    <ResponsiveContainer width="100%" height={110}>
      <AreaChart
        data={data}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0062FF" stopOpacity={0.4}/>
            <stop offset="100%" stopColor="#E5F0FF" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="uv" stroke="#0062FF" fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default TinyAreaChart;
