import {Box} from "@mui/material";
import Header from "../../components/header";
const Dashboard = () =>{
    return (
            <Box m="20px">
                <Box display="flex" justifyContent="space-between" alignment="center">
                    <Header title={"DASHBOARD"} subtitle={"Based on WAHIS and Google Scholar Data"}/>
                </Box>
            </Box>
        );
};

export default Dashboard ;