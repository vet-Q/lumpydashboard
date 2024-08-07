import { useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../theme";
import { preparedData as data } from "../data/preparedData";

// Custom Tooltip Component
const CustomTooltip = ({ point }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <div style={{
            color: isDarkMode ? '#fff' : '#000',
            background: isDarkMode ? '#333' : '#fff',
            padding: '12px 16px',
            border: '1px solid #ccc',
            borderRadius: '4px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ marginRight: '10px' }}>
                    <strong>Year:</strong> {point.data.xFormatted || point.data.x}
                </div>
                <div>
                    <strong>Count:</strong> {point.data.yFormatted || point.data.y}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ marginRight: '10px' }}>
                    <strong>Country:</strong> {point.serieId}
                </div>
            </div>
        </div>
    );
};

const Linechart = ({ isDashBoard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <ResponsiveLine
            data={data.lineChartData}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100]
                        }
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100]
                        }
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                        }
                    }
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                    }
                },
                tooltip: {
                    container: {
                        background: isDarkMode ? '#333' : '#fff',
                        color: isDarkMode ? '#fff' : '#000',
                    }
                }
            }}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Year',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            lineWidth={2}
            enableArea={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            enableSlices="x"
            tooltip={CustomTooltip}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
}

export default Linechart;
