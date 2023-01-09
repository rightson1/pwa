import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useGlobalProvider } from "../../context/themeContext";
import { createUserWithEmailAndPassword } from "firebase/auth"
import Header from "../../components/Title";
import Flex from "../../components/Flex";
import { Formik } from "formik";
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import { useTimeMutation, useTimeQuery, useTimeUpdate } from "../../util/useTime";
import { baseUrl } from "../../src/data";
import { auth, db } from "../../firebase"
import { useAuth } from "../../context/authContext";
import { useAdminQuery } from "../../util/useAdmin";
import Info from "../../components/Info"
import { setDoc, doc } from "firebase/firestore";
const Settings = () => {
    const { colors, isMobile } = useGlobalProvider();
    const { admin } = useAuth()
    const [loading1, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const step = Number(localStorage.getItem('activeStep') ? localStorage.getItem('activeStep') : 0)

    const [activeStep, setActiveStep] = React.useState(step);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    useEffect(() => {
        localStorage.setItem('activeStep', activeStep)
    }, [activeStep])

    const { mutate, isLoading, isSuccess } = useTimeMutation()
    const { mutate: update, isLoading: loading } = useTimeUpdate()
    const { data: admins } = useAdminQuery()
    const { data: savedTime } = useTimeQuery()
    const [desc, setDesc] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!admin) {
            setMessage('Please login')
            setOpen(true)
            router.push('/')

        }
        const date = e.target.date.value;
        const data = { date, id: savedTime.id }

        if (savedTime) {
            update(data)
        } else {
            mutate(data)

        }
    };

    const handleFormSubmit = (values, { resetForm }) => {


        if (admins.length > 3) {
            setMessage('Admin Cannot Exceed 3')
            setOpen(true)
            return
        }
        const { email, name, password } = values
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            console.log('rafa')
            axios.post(`${baseUrl}/admins`, { name, email, password }).then((res) => {
                const adminRef = doc(db, "admins", res.data._id);
                setDoc(adminRef, {
                    name,
                    email,
                    role: "admin",
                    isDeleted: false,
                    password
                }).then(() => {
                    setLoading(false)
                    router.push("/admin")
                    setMessage("Admin Created Successfully")

                }).catch(() => {
                    setLoading(false)
                })

            }).catch(() => {
                setLoading(false)
            })
        }).catch((error) => {
            setLoading(false)
            const errorCode = error.code;
            const errorMessage = error.message;

            setMessage(errorCode)
            setOpen(true)


        })


    }
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
                                index === steps.length - 1 ? (
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
        <Box my={5}>
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
        </Box>
        {/* {
            admin && admin?.role === "s.admin" && (<Box my={5}>
                <Typography my={2} variant="h6" sx={{ color: colors.greenAccent[500] }}>Add New Admin</Typography>

                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={userSchema}

                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isMobile ? "span 4" : undefined },
                                }}
                            >

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Admin Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                    sx={{
                                        gridColumn: {
                                            xs: "span 4",
                                            sm: "span 4",
                                            md: "span 2",

                                        }
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Admin Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{
                                        gridColumn: {
                                            xs: "span 4",
                                            sm: "span 4",
                                            md: "span 2",

                                        }
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Admin Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                    sx={{
                                        gridColumn: {
                                            xs: "span 4",
                                            sm: "span 4",
                                            md: "span 4",

                                        }
                                    }}
                                />

                            </Box>
                            <Box display="flex" justifyContent="end" mt="50px">
                                {loading1 ? <Button type="button" sx={{
                                    color: colors.grey[100],
                                    backgroundColor: colors.primary[400] + " !important",
                                    opacity: 0.5 + " !important",
                                }} variant="contained">
                                    Loading...
                                </Button> :
                                    <Button type="submit" sx={{
                                        color: colors.grey[100],
                                        backgroundColor: colors.primary[400] + " !important",
                                    }} variant="contained">
                                        Create New Admin
                                    </Button>}
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>)
        } */}

        <Info open={open} setOpen={setOpen} message={message} />
    </Box>;
};
const initialValues = {
    name: "",
    email: "",
    password: "",
};
const userSchema = yup.object().shape({
    name: yup.string().required("Electrol Position Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
})


const steps = [
    {
        label: 'Create An Account',
        description: `First create an account/login if you already have one or if your
         were account was created by a Super Admin`,
    },
    {
        label: 'Create Electrol Positions',
        description:
            'Add or create positions for the election',
    },
    {
        label: 'Add Candidates',
        description: `Add candidates to the positions you created`,
    },
    {
        label: 'Add FAQ',
        description: 'Add Frequently Asked Questions',
    },
    {
        label: 'Create Notifications',
        description: 'Create notifications for the election e.g. elections day, results day, etc',
    },
    {
        label: "Verify Voters",
        description: "Verify voters to be able to vote"
    }
];


Settings.getLayout = (page) => {
    return <>
        {page}
    </>
}
Settings.admin = true




export default Settings;
