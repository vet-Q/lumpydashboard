import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, useTheme, Avatar } from '@mui/material';
import {tokens} from "../theme";

const ProfileChart = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const colors = tokens(theme.palette.mode);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: 600,
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: 24,
        padding: theme.spacing(4),
        color: theme.palette.text.primary,
        textAlign: 'center',
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Avatar
                        src="/kwon.jpg"
                        alt="Profile Photo"
                        sx={{
                            width: 100,
                            height: 100,
                            margin: '0 auto',
                            mb: 2,
                        }}
                    />
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Okyu
                    </Typography>

                    <Typography id="modal-modal-subtitle" variant="h5" component="h2" color={colors.greenAccent[500]}>
                        Veterinarian, Jr.developer
                    </Typography>
                    <Typography id="modal-modal-description" variant="h5" sx={{mt: 2}}>
                        <br/>
                        I am very interested in
                        <br/>
                        diagnosing and analyzing animal diseases.
                        <br/>
                        <br/>
                        I am interested in React and Next.js, love Python,
                        <br/>
                        and enjoy all tasks involving computers
                        <br/>
                        with a bit of a nerdy tendency.
                        <br/>
                        <br/>
                        Likes: New programming languages, Korean novels, soju, and Hanwha Eagles (⚾!)
                    </Typography>
                    <Box mt="20px">
                        <Typography id="modal-modal-subtitle" variant="h5" component="h2" color={colors.greenAccent[500]}>
                            "There should be one-- and preferably only one --obvious way to do it (Zen of Python)"
                        </Typography>
                    </Box>
                    <Box mt="20px">
                        <Typography id="modal-modal-subtitle" variant="h5" component="h2" >
                            Kwonok5945@gmail.com
                        </Typography>
                    </Box>
            </Box>
        </Modal>
</div>
)
    ;
}

export default ProfileChart;
