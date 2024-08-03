import { ResponsiveBump } from '@nivo/bump'
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Bumpdata as data } from "../data/mockData";


const BumpChart = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <ResponsiveBump
            data={data}
            theme={{
                axis:{
                    domain:{
                        line:{
                            stroke:colors.grey[100],
                        }
                    },
                    legend:{
                        text:{
                            fill:colors.grey[100]
                        }
                    },
                    ticks:{
                        line:{
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text:{
                            fill:colors.grey[100],
                        }
                    }
                },
                legend:{
                    text:{
                        fill:colors.grey[100],
                    }
                }
            }

            }
            colors={{ scheme: 'spectral' }}
            lineWidth={3}
            activeLineWidth={6}
            inactiveLineWidth={3}
            inactiveOpacity={0.15}
            pointSize={10}
            activePointSize={16}
            inactivePointSize={0}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{ from: 'serie.color' }}
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -36,
                truncateTickAt: 0
            }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
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
    )
}

export default BumpChart