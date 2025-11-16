import { Cell, Pie, PieChart, Tooltip } from "recharts";
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
}) => {
    if (cx == null || cy == null || innerRadius == null || outerRadius == null)
        return null;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const angle = -(midAngle ?? 0) * RADIAN;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    return (
        <text
            x={x}
            y={y}
            fill="#fff"
            textAnchor="middle" // <-- center horizontally
            dominantBaseline="middle" // <-- center vertically
        >
            <tspan x={x} dy={-6}>
                {name}
            </tspan>
            {"   "}
            {/* first line */}
            <tspan
                x={x}
                dy={20}
            >{`${((percent ?? 1) * 100).toFixed(0)}%`}</tspan>{" "}
            {/* second line */}
        </text>
    );
};

const RADIAN = Math.PI / 180;
export function PieChartWithCustomizedLabel({
    data,
    isAnimationActive = true,
    colors,
}) {
    return (
        <PieChart
            style={{
                width: "100%",
                maxWidth: "500px",
                maxHeight: "40vh",
                aspectRatio: 1,
            }}
            responsive
        >
            <Pie
                data={data}
                labelLine={false}
                label={renderCustomizedLabel}
                dataKey="value"
                isAnimationActive={isAnimationActive}
            >
                {data.map((entry, index) => (
                    <Cell
                        style={{ outline: "none" }}
                        key={`cell-${entry.name}`}
                        fill={colors[index % colors.length]}
                        stroke="#242424"
                        strokeWidth={2}
                    />
                ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
        </PieChart>
    );
}
