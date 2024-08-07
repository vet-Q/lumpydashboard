import { Box } from "@mui/material";
import Topbar from "../global/Topbar"
import Linechart from "../../components/Linechart";

const Line = () =>{
    return (
        <Box m="20px">
            <Topbar title="Line chart" subtitle="simple Line"/>
            <Box height="75vh">
                <Linechart/>
            </Box>
        </Box>
    )
}

export default Line;