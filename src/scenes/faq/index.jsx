import { Box } from "@mui/material";
import Topbar from "../global/Topbar"
import FaqPage from "../../components/Faq";

const FAQ = () =>{
    return (
        <Box m="20px">
            <Topbar title="FAQ" subtitle="All about LSD"/>
            <Box height="75vh">
                <FaqPage/>
            </Box>
        </Box>
    )
}

export default FAQ