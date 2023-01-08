import React, { useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../../../components/Title";
import { useGlobalProvider } from "../../../context/themeContext";
import FAQ from "../../../components/FAQ";
import { usePositionQuery } from "../../../util/usePositions";
import { useRouter } from "next/router";
import Skeleton from '@mui/material/Skeleton';
import CandidateCard from "../../../components/CandidateCard";
import { candidates as data } from "../../../src/data";
import Flex from "../../../components/Flex";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Info from "../../../components/Info"
import { useCandidatesMutation, useCandidatesQuery, usePositionCandidateQuery } from "../../../util/useCandidate";
const Faq = () => {
    const router = useRouter()
    const { id } = router.query
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [opened, setOpened] = React.useState(false);

    const { data: candidates } = usePositionCandidateQuery(id)
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };
    const { colors, isMobile } = useGlobalProvider()

    const { data: position } = usePositionQuery(id);
    const { mutateAsync, isError, isSuccess, isLoading } = useCandidatesMutation()
    const submit = (e) => {
        e.preventDefault();
        const name = e.target.name.value
        const reg = e.target.reg.value
        const data = { positionId: position._id, positionName: position.name, name, reg }
        mutateAsync(data).then(() => {
            handleClose();
            e.target.reset()
        }).catch((err) => {
            console.log(err)
        }
        )
    }
    useEffect(() => {
        if (isSuccess) {
            setMessage('success🥂')
            setOpened(true)

        }
        if (isError) {
            setMessage('Error😢, try again or check,candidate prolly exist')
            setOpened(true)
        }
    }, [isSuccess, isError])


    return <Box m="20px">
        <Flex>       {position ? <Header title={position.name} subtitle={position.description} /> :
            <Header title="CANDIDATES" subtitle="Candidate Cards" />
        }
            <Button onClick={handleClickOpen} sx={{
                backgroundColor: colors.grey[100] + " !important",
                color: colors.grey[900] + " !important",
            }}>ADD</Button></Flex>



        <Dialog disableEscapeKeyDown open={open} onClose={handleClose} component="form" onSubmit={submit}>
            <DialogTitle>Enter Candidate details</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }} >
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <TextField label="name" variant="outlined" name="name" />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <TextField label="reg number" variant="outlined" name="reg" />
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button sx={{
                    color: colors.grey[100] + " !important",
                }} onClick={handleClose}>Cancel</Button>
                {isLoading ? <Button sx={{
                    color: colors.grey[100] + " !important",
                }} type="submit" >Loading</Button> : <Button sx={{
                    color: colors.grey[100] + " !important",
                }} type="submit" >Ok</Button>}
            </DialogActions>
        </Dialog>

        <Box my={2}>
            {
                candidates?.length > 0 ? (
                    <Box
                        mt="20px"
                        display="grid"
                        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                        justifyContent="space-between"
                        rowGap="20px"
                        columnGap="1.33%"


                    >
                        {

                            candidates.map((item) => {

                                return <CandidateCard key={item._id} {...item} admin={true} />

                            }
                            )
                        }
                    </Box>
                ) : (
                    <Box
                        Box
                        mt="20px"
                        display="grid"
                        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                        justifyContent="space-between"
                        rowGap="20px"
                        columnGap="1.33%">
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                                <Box spacing={.5} key={index} height="100%" width="100%">

                                    <Skeleton variant="rectangular" width="100%" height="200px" />
                                </Box>
                            ))
                        }
                    </Box>
                )
            }
        </Box>
        <Info open={opened} setOpen={setOpened} message={message} />
    </Box>;
};

Faq.getLayout = (page) => {
    return <>
        {page}
    </>
}
Faq.admin = true

export default Faq

