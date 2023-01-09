import React, { useEffect } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useGlobalProvider } from "../../context/themeContext";
import Header from "../../components/Title";
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { usePositionsQuery } from '../../util/usePositions';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useCandidatesQuery } from '../../util/useCandidate';
import { useAuth } from '../../context/authContext';
import { useVoteQuery, useVotesMutation } from '../../util/useVote';
import Info from "../../components/Info"
import { useTimeQuery } from "../../util/useTime";
import { useRouter } from "next/router";
import axios from "axios";
const Vote = () => {
    const [message, setMessage] = React.useState("");
    const [opened, setOpened] = React.useState(false);
    const { colors } = useGlobalProvider();
    const { voter } = useAuth()
    const { data: positions } = usePositionsQuery();
    const { data: candidates } = useCandidatesQuery()
    const [values, setValues] = React.useState(null)
    const { mutate, isLoading, isError, isSuccess, error } = useVotesMutation();
    const { data: isVote, isLoading: loading } = useVoteQuery(voter?.reg)
    const { data: time, isLoading: tLoading } = useTimeQuery();
    const [isVoteDay, setIsVoteDay] = React.useState(false)
    const router = useRouter();
    useEffect(() => {
        const currentDate = new Date();
        const timeLeft = new Date(time?.time.date) - currentDate;
        setIsVoteDay(timeLeft < 0)
    }, [time])


    const rStyle = {
        color: colors.greenAccent[500],
        '& .MuiSvgIcon-root': {
            color: colors.greenAccent[500],
        },
        '& .MuiButton-root': {
            backgroundColor: colors.greenAccent[400] + "!important",
        }

    }
    const submit = (e) => {
        e.preventDefault()
        if (!voter) {
            setOpened(true)
            setMessage('You are not logged in')
            setTimeout(() => {
                router.push('/')
            }, 2000)
            return
        }


        if (isVote > 0) {
            setMessage('You Already Voted')
            setOpened(true)
            return
        }
        if (values === null) {
            setMessage('Kindly Select A Candidate')
            setOpened(true)
            return
        }
        const data = Object.keys(values).map((position) => {
            return {
                position,
                candidateId: values[position],
                voterReg: voter.reg,
                candidateName: candidates?.find((candidate) => candidate._id === values[position])?.name
            }
        });

        mutate(data)
        axios.post('https://backup-one.vercel.app/api/votes', data).then(() => {
            console.log('done')
        }).catch((e) => {
            console.log(e)
        })

    }
    useEffect(() => {

        if (isSuccess) {
            setMessage('success🥂')
            setOpened(true)

        }
        if (isError) {
            setMessage('Error😢')
            setOpened(true)
        }
    }, [isSuccess, isError])
    return <Box m="20px">
        <Header title="VOTING PAGE" subtitle={isVote & isVote > 0 ? 'You Already Voted' : 'Vote And Practise Democracy'} />
        <Box mt={2} display="flex" flexDirection="column" gap={5} component="form" onSubmit={submit}

        >
            {
                positions?.length ? positions?.map((position) => {
                    return (
                        <FormControl key={position._id}>
                            <FormLabel
                                disableAnimation={true}
                                sx={{
                                    color: colors.greenAccent[500] + "!important",

                                }}
                            >Choose Your prefered candidate for {position.name}</FormLabel>

                            <RadioGroup
                                name={position.name}
                                onChange={(e) => setValues({ ...values, [position.name]: e.target.value })}
                            >
                                {candidates?.length ? candidates?.filter((candidate) => candidate.positionId === position._id).map((candidate) => {
                                    return (
                                        <>
                                            <FormControlLabel value={candidate._id} control={<Radio sx={rStyle} />} label={candidate.name} />
                                        </>
                                    )
                                }
                                ) : (
                                    <Box display="flex" gap={1} flexDirection="column">
                                        {
                                            [1, 2, 3, 4].map((item, index) => (
                                                <Skeleton key={index} variant="rectangular" width="100%" height={5} />

                                            ))
                                        }
                                    </Box>

                                )}

                            </RadioGroup>
                        </FormControl>

                    )
                }) : (<Box display="flex" gap={4} flexDirection="column">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                            <Stack spacing={.5} key={index} mb="2rem">

                                <Skeleton variant="rectangular" width="100%" height={100} />

                            </Stack>
                        ))
                    }
                </Box>)
            }
            {
                isLoading ? <Button
                    sx={{
                        backgroundColor: colors.greenAccent[400] + "!important",
                        alignSelf: "flex-end",
                        px: 5,
                    }}

                >Loading...</Button> :

                    !isVoteDay ?

                        <Button
                            sx={{
                                backgroundColor: colors.greenAccent[400] + "!important",
                                alignSelf: "flex-end",
                                px: 5,
                            }}
                        >Elections Not Today</Button>
                        : (isVote > 0) ?
                            <Button
                                sx={{
                                    backgroundColor: colors.greenAccent[400] + "!important",
                                    alignSelf: "flex-end",
                                    px: 5,
                                }}
                                disabled={true}
                            >Voted!!</Button> :



                            <Button
                                sx={{
                                    backgroundColor: colors.greenAccent[400] + "!important",
                                    alignSelf: "flex-end",
                                    px: 5,
                                }}
                                type="submit"
                                disabled={loading || isLoading || isSuccess || tLoading ? true : false}
                            >Submit</Button>
            }
        </Box>
        <Info open={opened} setOpen={setOpened} message={message} />
    </Box>
};
Vote.getLayout = (page) => {
    return <>
        {page}
    </>
}
Vote.voter = true


export default Vote;
