import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { preparedData as data } from "../data/preparedData";

const Barchart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const CustomTooltip = ({ id, value }) => (
        <div
            style={{
                padding: '12px 16px',
                background: colors.blueAccent[200],
                color: colors.grey[700],
                opacity: 1,
                borderRadius: '2px',
                boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            <strong>{id}</strong>: {value}
        </div>
    );


    return (
        <ResponsiveBar
            data={data.barChartData}
            tooltip={CustomTooltip} //커스텀 툴팁을 정의하고, 이걸 가져와서 여기서 보여주는 형태로 구성
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100],
                        },
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                    },
                },
            }}
            keys={["Africa", "Asia", "Europe"]}
            indexBy="year"
            margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            borderColor={{
                from: "color",
                modifiers: [["darker", "1.6"]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                // legend: "Year",
                legendPosition: "middle",
                legendOffset: 32,
            }}
            axisLeft={isDashboard ? null : {
                tickSize: 2,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "Cases",
                legendPosition: "middle",
                legendOffset: -40,
            }}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
            }}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                },
            ]}
            role="application"
            barAriaLabel={function (e) {
                return e.id + ": " + e.formattedValue + " in year: " + e.indexValue;
            }}
        />
    );
};

export default Barchart;
