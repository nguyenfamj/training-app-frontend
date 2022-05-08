import React from 'react';

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

import { useTrainingsQuery } from '../../Services/trainingsAPI';

const Statistics = () => {
  const { data } = useTrainingsQuery();

  const chartRecords = data?.content.map((training) => ({
    name: training.activity,
    duration: training.duration,
  }));

  return (
    <div className='page-container'>
      <div>
        <h3 className='heading'>Statistics</h3>
      </div>
      <ResponsiveContainer width={1000} height={600}>
        <BarChart data={chartRecords}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='duration' fill='#82ca9d' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;
