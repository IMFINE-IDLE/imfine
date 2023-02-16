import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import api from '../../api/api';

const SymptomGraph = ({ diaryId, date, isWeekly }) => {
  const [data, setData] = useState(null);
  const [dataKeys, setDataKeys] = useState(null);
  const colors = [
    'main',
    'light-pink',
    'light',
    'pink',
    'icon',
    'dark',
    'red',
    'gray700',
    'gray800',
  ];

  // 증상 정보 불러오기
  const fetchGraphData = async () => {
    try {
      const params = {
        diaryId,
        date: moment(date).format('YYYY-MM-DD'),
        type: isWeekly ? 'week' : 'month',
      };
      const res = await axios.get(api.diary.getGraphSymptoms(params));

      const newData = [];
      const symptomList = [];
      res.data.data.forEach((val) => {
        const obj = {};
        obj['date'] = moment(val.date).format('M/D');
        val.symptoms.forEach(({ symptomName, score }) => {
          obj[symptomName] = score;
          if (!symptomList.includes(symptomName)) symptomList.push(symptomName);
        });
        newData.push(obj);
      });

      setData(newData);
      setDataKeys(symptomList);
      console.log('newData', newData);
      console.log('sname', symptomList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGraphData();
  }, [date, isWeekly]);

  return isWeekly ? (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" interval={0} dx={-7} tick={{ fontSize: 12 }} />
        <YAxis tickCount={6} domain={[2, 10]} tickSize={4} width={16} />
        <Tooltip />
        <Legend />
        {dataKeys?.map((symptom, idx) => (
          <Line
            type="monotone"
            dataKey={symptom}
            stroke={`var(--${colors[idx % 9]}-color)`}
            strokeWidth={2}
            legendType="circle"
            key={symptom}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          interval={'preserveEnd'}
          tick={{ fontSize: 12 }}
          dx={-2}
        />
        <YAxis tickCount={6} domain={[0, 10]} tickSize={4} width={16} />
        <Tooltip />
        <Legend />
        {dataKeys?.map((symptom, idx) => (
          <Line
            type="monotone"
            dataKey={symptom}
            stroke={`var(--${colors[idx % 9]}-color)`}
            strokeWidth={2}
            legendType="circle"
            key={symptom}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SymptomGraph;
