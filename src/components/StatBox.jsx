import {Box, Typography, useTheme} from '@mui/material';
import {tokens} from "../theme";
import ProgressCircle from "./progressCircle";

const StatBox = ({title, subtitle, icon, progress, increase}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    console.log(title, subtitle)
    return (<Box width="100%" m="0 30px">
        <Box display="flex" justifyContent="space-between">
            <Box>
                {icon}
                <Typography variant="h3" fontWeight="bold" sx={{color: colors.grey[100]}}>
                    {title}
                </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
                <Box>
                    <ProgressCircle progress={progress}/>
                    <Typography variant="h5" fontWeight="bold" sx={{color: colors.grey[400]}}>
                        {subtitle}
                    </Typography>
                    <Typography variant="h5" fontWeight="italic" sx={{color: colors.grey[600]}}>
                        {increase}
                    </Typography>
                </Box>
            </Box>
        </Box>
    </Box>)
}

export default StatBox