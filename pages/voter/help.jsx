import React from "react";
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
const Help = () => {
    const { colors } = useGlobalProvider();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
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
Help.getLayout = (page) => {
    return <>
        {page}
    </>
}
Help.voter = true



export default Help;
