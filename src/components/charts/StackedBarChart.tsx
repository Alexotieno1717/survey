"use client"

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', 'Project Take': 4000, 'Project In': 2400, 'On Hold': 2400 },
  { name: 'Tue', 'Project Take': 3000, 'Project In': 1398, 'On Hold': 2210 },
  { name: 'Wed', 'Project Take': 2000, 'Project In': 9800, 'On Hold': 2290 },
  { name: 'Thu', 'Project Take': 2780, 'Project In': 3908, 'On Hold': 2000 },
  { name: 'Fri', 'Project Take': 1890, 'Project In': 4800, 'On Hold': 2181 },
  { name: 'Sat', 'Project Take': 2390, 'Project In': 3800, 'On Hold': 2500 },
  { name: 'Sun', 'Project Take': 3490, 'Project In': 4300, 'On Hold': 2100 },
];

// const data = [
//   { name: 'Jan', 'Project Take': 0, 'On Hold': 0 },
//   { name: 'Feb', 'Project Take': 0, 'On Hold': 0 },
//   { name: 'Mar', 'Project Take': 0, 'On Hold': 0 },
//   { name: 'Apr', 'Project Take': 0, 'On Hold': 0 },
//   { name: 'May', 'Project Take': 0, 'On Hold': 0 },
//   { name: 'Jun', 'Project Take': 0, 'On Hold': 0 },
//   { name: 'Jul', 'Project Take': 0, 'On Hold': 0 },
//   { name: 'Aug', 'Project Take': 0, 'On Hold': 0 },
//   { name: 'Sep', 'Project Take': 0, 'On Hold': 0 },
//   { name: 'Oct', 'Project Take': 0, 'On Hold': 0 },
//   { name: 'Nov', 'Project Take': 0, 'On Hold': 0 },
//   { name: 'Dec', 'Project Take': 0, 'On Hold': 0 },
// ];


interface CustomTooltipProps {
  payload?: any[];
}

const renderCustomLegend = (props: CustomTooltipProps) => {
  const { payload } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28, paddingLeft: 20, borderRadius: 20 }}>
      {payload?.map((entry, index) => (
        <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
          <div style={{
            width: 16,
            height: 10,
            borderRadius: 10,
            backgroundColor: entry.color,
            marginRight: 6,
          }}></div>
          <span style={{ color: '#696974', fontSize: 14 }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};



const StackedBarChart: React.FC = () => {

    const renderCustomizedLegend = (value: string, entry: any) => {
      return <span style={{ color: '#696974', marginRight: 10, paddingLeft: 6, fontSize: 14, }}>{value}</span>;
    };



  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={20} />
        <YAxis axisLine={false} tickLine={false} tickMargin={20} />
        <Tooltip cursor={{'fill': 'transparent'}} />
        <Legend 
          content={renderCustomLegend}
        />
        <Bar dataKey="Project In" stackId="a" fill="#0561FC" radius={[0, 0, 10, 10]} barSize={6} />
        <Bar dataKey="Project Take" stackId="a" fill="#50B5FF" radius={[0, 0, 0, 0]} />
        <Bar dataKey="On Hold" stackId="a" fill="#E3F6FF" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
