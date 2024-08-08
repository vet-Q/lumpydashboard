import { ResponsiveBump } from '@nivo/bump';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { preparedData as data } from "../data/preparedData";

const BumpChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const CustomTooltip = ({ point }) => (
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
            <strong>{point.serie.id}</strong>: {point.data.yFormatted}
        </div>
    );

    return (
        <ResponsiveBump
            data={data.bumpChartData}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100],
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
                legend: {
                    text: {
                        fill: colors.grey[100],
                    }
                }
            }}
            tooltip={CustomTooltip}
            colors={{ scheme: 'spectral' }}
            lineWidth={2}
            activeLineWidth={6}
            inactiveLineWidth={3}
            inactiveOpacity={0.15}
            pointSize={4}
            activePointSize={16}
            inactivePointSize={0}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            activePointBorderWidth={2}
            pointBorderColor={{ from: 'serie.color' }}
            axisTop={null} // 위쪽 축 라벨을 없앱니다.
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 60,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'ranking',
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0
            }}
            margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
            axisRight={null}
        />
    );
}

export default BumpChart;
