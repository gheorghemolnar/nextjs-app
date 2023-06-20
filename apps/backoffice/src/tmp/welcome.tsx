import React from 'react';
import {
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
    ZAxis,
} from 'recharts';

const data01 = [
    { x: 5, y: 30 },
    { x: 30, y: 200 },
    { x: 45, y: 100 },
    { x: 50, y: 400 },
    { x: 70, y: 150 },
    { x: 100, y: 250 },
];
const data02 = [
    { x: 5, y: 40 },
    { x: 30, y: 250 },
    { x: 45, y: 200 },
    { x: 50, y: 480 },
    { x: 70, y: 250 },
    { x: 100, y: 350 },
];
const data03 = [
    { x: 10, y: 24 },
    { x: 30, y: 230 },
    { x: 45, y: 190 },
    { x: 50, y: 380 },
    { x: 70, y: 210 },
    { x: 100, y: 150 },
];

export default function Welcome() {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ScatterChart
                margin={{
                    top    : 20,
                    right  : 20,
                    bottom : 20,
                    left   : 20,
                }}
            >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="Semaine" unit="" />
                <YAxis type="number" dataKey="y" name="Contrôles" unit="" />
                <ZAxis type="number" range={[100]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter
                    name="A school"
                    data={data01}
                    fill="#8884d8"
                    line
                    shape="square"
                />
                <Scatter
                    name="B school"
                    data={data02}
                    fill="#82ca9d"
                    line
                    shape="circle"
                />
                <Scatter
                    name="B school"
                    data={data03}
                    fill="#82ca9d"
                    line
                    shape="triangle"
                />
            </ScatterChart>
        </ResponsiveContainer>
    );
}
