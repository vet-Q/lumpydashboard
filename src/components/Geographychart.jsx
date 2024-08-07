import { ResponsiveChoropleth } from '@nivo/geo'
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { geoFeatures } from "../data/mockGeoFeatures";
import { preparedData as data } from "../data/preparedData";

const GeographyChart = ({isDashboard = false}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
    <ResponsiveChoropleth
        data={data.choroplethData}
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
        features={geoFeatures.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[ 0, 1500 ]}
        unknownColor="#FFFFFF"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={isDashboard? 43 : 150}
        projectionTranslation={isDashboard? [0.3, 1.0]:[ 0.42, 0.7 ]}
        projectionRotation={[ 0, 0, 0 ]}
        enableGraticule={true}
        borderWidth={1.5}
        borderColor="#152538"
        legends={
        !isDashboard ?
        [
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: colors.grey[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ] : undefined
    }
    />
)
}

export default GeographyChart