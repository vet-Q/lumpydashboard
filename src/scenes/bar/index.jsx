import { Box } from "@mui/material";
import Header from "../../components/header";
import BarChart from "../../components/Barchart";

const Bar = () =>{
    return (
        <Box m="20px">
            <Header title="Bar chart" subtitle="simple box"/>
            <Box height="75vh">
                <BarChart/>
            </Box>
        </Box>
    )
}

export default Bar;