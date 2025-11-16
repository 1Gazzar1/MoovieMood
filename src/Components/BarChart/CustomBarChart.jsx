import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useState,useEffect } from "react";

const CustomBarChart = ({ data }) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    const fontSize = width > 768 ? 12 : 8;
    return (
        <div style={{ width: "100%", height: "180px", marginTop: 8 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={[...data.reverse()]}
                    margin={{ top: 20, right: 10, left: 0, bottom: 40 }}
                >
                    <Bar
                        dataKey="value"
                        fill="#863030"
                        radius={[6, 6, 0, 0]}
                        barSize={20}
                    />
                    <XAxis
                        dataKey="name"
                        tick={{ fill: "#fff", fontSize: fontSize }}
                        angle={-25}
                        textAnchor="end"
                        padding={{ left: 5, right: 5 }}
                    />
                    <YAxis tick={{ fill: "#fff", fontSize: 12 }} />
                    <Tooltip
                        cursor={{ fill: "rgba(0,0,0,0.1)" }}
                        contentStyle={{
                            borderRadius: 8,
                            border: "none",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;
