import { Box } from "@mui/material";
import Topbar from "../global/Topbar"
import News from "../../components/News";

const NewsTable = () =>{
    return (
        <Box m="20px">
            <Topbar title="News" subtitle="These are the search results using the NewsAPI and NAVER OPENAPI (based on a 1-month period)."/>
            <Box height="75vh">
                <News/>
            </Box>
        </Box>
    )
}

export default NewsTable;