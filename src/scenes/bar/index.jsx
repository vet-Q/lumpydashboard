import { Box } from "@mui/material";
import Barchart from "../../components/Barchart";
import Topbar from "../global/Topbar"

const Bar = () =>{
    return (
        <Box m="20px">
            <Topbar title="Bar chart" subtitle="simple box"/>
            <Box height="75vh">
                <Barchart/>
            </Box>
        </Box>
    )
}

export default Bar;