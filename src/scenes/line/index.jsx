import { Box } from "@mui/material";
import Header from "../../components/header";
import Linechart from "../../components/Linechart";

const Line = () =>{
    return (
        <Box m="20px">
            <Header title="Line chart" subtitle="simple Line"/>
            <Box height="75vh">
                <Linechart/>
            </Box>
        </Box>
    )
}

export default Line;