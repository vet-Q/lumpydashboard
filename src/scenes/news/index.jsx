import { Box } from "@mui/material";
import Header from "../../components/header";
import News from "../../components/News";

const NewsTable = () =>{
    return (
        <Box m="20px">
            <Header title="News" subtitle="News List"/>
            <Box height="75vh">
                <News/>
            </Box>
        </Box>
    )
}

export default NewsTable;