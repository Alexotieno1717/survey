"use client"

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMedia } from 'use-media';

const data = [
  { name: 'Jan', 'messages sent': 4000, 'On Hold': 2400 },
  { name: 'Feb', 'messages sent': 3000, 'On Hold': 2210 },
  { name: 'Mar', 'messages sent': 2000, 'On Hold': 2290 },
  { name: 'Apr', 'messages sent': 2780, 'On Hold': 2000 },
  { name: 'May', 'messages sent': 1890, 'On Hold': 2181 },
  { name: 'Jun', 'messages sent': 2390, 'On Hold': 2500 },
  { name: 'Jul', 'messages sent': 3690, 'On Hold': 2100 },
  { name: 'Aug', 'messages sent': 3490, 'On Hold': 2800 },
  { name: 'Sep', 'messages sent': 3000, 'On Hold': 2100 },
  { name: 'Oct', 'messages sent': 3890, 'On Hold': 2700 },
  { name: 'Nov', 'messages sent': 3990, 'On Hold': 2400 },
  { name: 'Dec', 'messages sent': 3890, 'On Hold': 2650 },
];

// const data = [
//     { name: 'Jan', 'messages sent': 0, 'On Hold': 0 },
//     { name: 'Feb', 'messages sent': 0, 'On Hold': 0 },
//     { name: 'Mar', 'messages sent': 0, 'On Hold': 0 },
//     { name: 'Apr', 'messages sent': 0, 'On Hold': 0 },
//     { name: 'May', 'messages sent': 0, 'On Hold': 0 },
//     { name: 'Jun', 'messages sent': 0, 'On Hold': 0 },
//     { name: 'Jul', 'messages sent': 0, 'On Hold': 0 },
//     { name: 'Aug', 'messages sent': 0, 'On Hold': 0 },
//     { name: 'Sep', 'messages sent': 0, 'On Hold': 0 },
//     { name: 'Oct', 'messages sent': 0, 'On Hold': 0 },
//     { name: 'Nov', 'messages sent': 0, 'On Hold': 0 },
//     { name: 'Dec', 'messages sent': 0, 'On Hold': 0 },
//   ];

const MessagingBarChart = () =>{

  const isSmallScreen = useMedia({maxWidth: '600px'});

  const margin = isSmallScreen ? {bottom: 10} : {bottom: 20};
  const barSize = isSmallScreen ? 16 : 32;

  return (
    <ResponsiveContainer width="100%" height={400} >
    <BarChart
      data={data}
      margin={margin}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={20} />
      <YAxis axisLine={false} tickLine={false} tickMargin={20} />
      <Tooltip cursor={{'fill': 'transparent'}} />
      <Bar dataKey="messages sent" stackId="a" fill="#50B5FF" radius={[0, 0, 0, 0]} barSize={barSize} />
      <Bar dataKey="On Hold" stackId="a" fill="#E3F6FF" radius={[10, 10, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
  )
}


export default MessagingBarChart;