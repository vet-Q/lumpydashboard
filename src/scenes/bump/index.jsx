import { Box } from "@mui/material";
import BumpChart from "../../components/Bumpchart";
import Topbar from "../global/Topbar"

const Bump = () =>{
    return (
        <Box m="20px">
            <Topbar title="Bump chart" subtitle="simple Bump"/>
            <Box height="75vh">
                <BumpChart/>
            </Box>
        </Box>
    )
}

export default Bump;