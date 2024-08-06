import { Box } from "@mui/material";
import BarChart from "../../components/Barchart";
import Topbar from "../global/Topbar"

const Bar = () =>{
    return (
        <Box m="20px">
            <Topbar title="Bar chart" subtitle="simple box"/>
            <Box height="75vh">
                <BarChart/>
            </Box>
        </Box>
    )
}

export default Bar;