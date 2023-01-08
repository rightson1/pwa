import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useGlobalProvider } from "../../context/themeContext";
import Header from "../../components/Title";
import Flex from "../../components/Flex";
import { useNotificationQuery, useNotificationDelete } from "../../util/useNotification";
import CircularProgress from '@mui/material/CircularProgress';
import Info from "../../components/Info"
const Notification = () => {
    const { colors } = useGlobalProvider()
    const [message, setMessage] = React.useState("");
    const [opened, setOpened] = React.useState(false);;
    const step = Number(localStorage.getItem('step') ? localStorage.getItem('step') : 0)
    const { mutate, isSuccess, isError, isLoading } = useNotificationDelete()
    const [activeStep, setActiveStep] = React.useState(step);

    useEffect(() => {
        localStorage.setItem('step', activeStep)
    }, [activeStep])
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const { data } = useNotificationQuery();
    const handleDelete = (id) => {
        mutate(id)
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
        <Header title="NOTIFICATION PAGE" subtitle="Notification Page" />
        <Box mt={2}>
            <Flex>   <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>Your Progress</Typography>    <Button sx={{
                bgcolor: colors.greenAccent[500] + "!important",
                color: colors.grey[100],
            }}>Save </Button>  </Flex>
            <Stepper activeStep={activeStep} orientation="vertical" sx={{
                "& .MuiSvgIcon-root": {
                    color: colors.greenAccent[400],
                },
                "& .MuiButton-root": {
                    backgroundColor: colors.greenAccent[400] + "!important",

                },
                "& .MuiButton-completed": {
                    backgroundColor: colors.greenAccent[800] + "!important",

                },
            }}>
                {data?.length && data?.map(({ notification: step, id }, index) => {

                    return (
                        <Step key={step.title}>
                            <StepLabel
                                optional={
                                    index === (data.length - 1) ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.title}
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.desc}</Typography>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === (data.length - 1) ? 'Finish' : 'Continue'}
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(id)}

                                            sx={{
                                                mt: 1, mr: 1,
                                                color: colors.grey[200] + "!important",
                                            }}
                                        >
                                            {isLoading ? <CircularProgress size={20} /> : 'Delete'}
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    )
                })}
            </Stepper>
            {activeStep === data?.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{
                        color: colors.greenAccent[500],
                        "&:hover": {
                            backgroundColor: colors.greenAccent[100] + "!important",
                        },

                    }} >
                        Reset
                    </Button>
                </Paper>
            )}

        </Box>
        <Info open={opened} setOpen={setOpened} message={message} />
    </Box>;
};

Notification.getLayout = (page) => {
    return <>
        {page}
    </>
}
Notification.admin = true



export default Notification;
