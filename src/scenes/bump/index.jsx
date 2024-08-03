import { Box } from "@mui/material";
import Header from "../../components/header";
import BumpChart from "../../components/Bumpchart";

const Bump = () =>{
    return (
        <Box m="20px">
            <Header title="Bump chart" subtitle="simple Bump"/>
            <Box height="75vh">
                <BumpChart/>
            </Box>
        </Box>
    )
}

export default Bump;