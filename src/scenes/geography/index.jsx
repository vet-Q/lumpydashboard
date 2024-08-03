import { Box } from "@mui/material";
import Header from "../../components/header";
import Geographychart from "../../components/Geographychart";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme"

const Geography = () =>{

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            <Header title="Geo chart" subtitle="simple Geo"/>
            <Box height="75vh"
                 border={`1px solid 
                 ${colors.grey[100]}`}
                 borderRadius="4px"
            >
                <Geographychart/>
            </Box>
        </Box>
    )
}

export default Geography;