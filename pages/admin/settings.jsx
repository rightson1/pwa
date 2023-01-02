import React, { useState } from "react";
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

import TextField from '@mui/material/TextField';
import moment from 'moment';
import { useTimeMutation, useTimeQuery, useTimeUpdate } from "../../util/useTime";
import { baseUrl } from "../../src/data";
const Settings = () => {
    const { colors } = useGlobalProvider();
    const [activeStep, setActiveStep] = React.useState(0);
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const { mutate, isLoading, isSuccess } = useTimeMutation()
    const { mutate: update, isLoading: loading } = useTimeUpdate()
    const { data: savedTime } = useTimeQuery()
    const handleSubmit = (e) => {
        e.preventDefault()
        const date = e.target.date.value;
        const data = { date, id: savedTime.id }
        console.log(data)
        if (savedTime) {
            update(data)
        } else {
            mutate(data)

        }
    };

    return <Box m="20px">
        <Header title="SETTINGS PAGE" subtitle="Configure Settings" />
        <Box mt={2}>
            <Flex>   <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>Your Progress</Typography>    <Button sx={{
                bgcolor: colors.greenAccent[500] + "!important",
                color: colors.grey[100],
            }}>Change Stepper </Button>  </Flex>
            <Stepper activeStep={activeStep} orientation="vertical" sx={{
                "& .MuiSvgIcon-root": {
                    color: colors.greenAccent[500],
                },
                "& .MuiButton-root": {
                    backgroundColor: colors.greenAccent[400] + "!important",

                },
                "& .MuiButton-completed": {
                    backgroundColor: colors.greenAccent[400] + "!important",

                },
            }}>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
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
        <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>Election Date Settings</Typography>
        <Box my={2} gap={2} display="flex" alignItems="center" flexWrap="wrap" component="form" onSubmit={handleSubmit}>
            <Box display="flex" gap={3} alignItems="center">
                <Typography>Date:</Typography>
                <TextField required name="date" type="date" />

            </Box>

            <Button
                sx={{
                    bgcolor: colors.greenAccent[500] + "!important",
                    color: colors.grey[100],
                    py: 2,
                    px: 4
                }}
                type="submit"


            >{isLoading || loading ? 'Loading...' : 'Update'}</Button>
        </Box>

    </Box>;
};



const steps = [
    {
        label: 'Select campaign settings',
        description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Create an ad group',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];


Settings.getLayout = (page) => {
    return <>
        {page}
    </>
}
Settings.admin = true




export default Settings;
