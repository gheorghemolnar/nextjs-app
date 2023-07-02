import {
    Bar,
    BarChart,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts';

const data1 = [
    {
        name  : 'Jan',
        total : Math.floor(Math.random() * 500) + 10
    },
    {
        name  : 'Fév',
        total : Math.floor(Math.random() * 500) + 10
    },
    {
        name  : 'Mar',
        total : Math.floor(Math.random() * 500) + 10
    },
    {
        name  : 'Avr',
        total : Math.floor(Math.random() * 500) + 10
    },
    {
        name  : 'Mai',
        total : Math.floor(Math.random() * 500) + 10
    },
    {
        name  : 'Juin',
        total : Math.floor(Math.random() * 500) + 10
    },
    {
        name  : 'Juil',
        total : Math.floor(Math.random() * 500) + 10
    },
    {
        name  : 'Août',
        total : Math.floor(Math.random() * 500) + 10
    },
    {
        name  : 'Sep',
        total : Math.floor(Math.random() * 500) + 10
    },
    {
        name  : 'Oct',
        total : Math.floor(Math.random() * 500) + 10
    },
    {
        name  : 'Nov',
        total : Math.floor(Math.random() * 500) + 10
    },
    {
        name  : 'Déc',
        total : Math.floor(Math.random() * 500) + 10
    }
];

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data1}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="total" fill="#82ca9d" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}

const data2 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 }
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export function Example1() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart width={800} height={350}>
                <Pie
                    data={data2}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data2.map((_entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Pie
                    data={data2}
                    cx={420}
                    cy={200}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data2.map((_entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}
