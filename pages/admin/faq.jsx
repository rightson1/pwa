import React, { useEffect } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useGlobalProvider } from "../../context/themeContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Title";
import Info from "../../components/Info"
import { useFaqMutation, useFaqQuery } from "../../util/useFaq";
import { useRouter } from "next/router";
import { useAuth } from "../../context/authContext";
const Form = () => {
    const [ans, setAns] = React.useState('');
    const { colors } = useGlobalProvider();
    const { admin } = useAuth()
    const [open, setOpen] = React.useState(false);
    const router = useRouter()
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { mutate, isLoading, error, isError } = useFaqMutation()
    console.log(isError, isLoading)
    const handleFormSubmit = (values, { resetForm }) => {
        if (!admin) {
            setMessage('Please login')
            setOpen(true)
            router.push('/')

        }
        const data = { ...values, ans }
        mutate(data)
        if (!isError) {
            resetForm()

            setAns('')

        }
        setOpen(true)

    }


    return <Box m="20px">
        <Header title="FREQUENTLY ASKED QUESTIONS" subtitle="Enter question and answer to help voters" />

        <Box my={2}></Box>
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
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Enter question"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.quiz}
                            name="quiz"
                            error={!!touched.quiz && !!errors.quiz}
                            helperText={touched.quiz && errors.quiz}
                            sx={{
                                gridColumn: "span 4",


                            }}
                        />
                        <textarea
                            type="text"
                            value={ans}
                            label="Enter question"

                            onChange={(e) => setAns(e.target.value)}

                            style={{
                                backgroundColor: colors.primary[400],
                                gridColumn: 'span 4',

                            }} className="p-2  outline-none border-b-[1px] border-white" placeholder="Enter response" />


                    </Box>
                    <Box display="flex" justifyContent="end" mt="50px">
                        {isLoading ? <Button type="button" sx={{
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
                                Create New  FAQ
                            </Button>}
                    </Box>
                </form>
            )}
        </Formik>

        <Info open={open} setOpen={setOpen} message={isError ? 'Error !!!😞😞' : 'Success🥂🥂'} />

    </Box>;
};
const initialValues = {
    quiz: "",
};
const userSchema = yup.object().shape({
    quiz: yup.string().required("FAQ QUIZ is required"),

})
Form.getLayout = (page) => {
    return <>
        {page}
    </>
}
Form.admin = true


export default Form;
