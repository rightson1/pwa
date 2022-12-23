import React from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useGlobalProvider } from "../../context/themeContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Title"
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
const Form = () => {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };


    const { colors } = useGlobalProvider();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values) => {
        console.log(values)
    }
    return <Box m="20px">
        <Header title="NOTIFICATIONS PAGE" subtitle="Enter new notification to be displayed to all voters" />

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
                            label="Enter Notification Title"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.position}
                            name="position"
                            error={!!touched.position && !!errors.position}
                            helperText={touched.position && errors.position}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>,
                            }}

                            sx={{
                                gridColumn: "span 4",


                            }}
                        />
                        <textarea style={{
                            backgroundColor: colors.primary[400],
                            gridColumn: 'span 4',
                        }} className="p-2  outline-none border-b-[1px] border-white" placeholder="Enter notification descrition" />


                    </Box>
                    <Box display="flex" justifyContent="end" mt="50px">
                        <Button type="submit" sx={{
                            color: colors.grey[100],
                            backgroundColor: colors.primary[400] + " !important",
                        }} variant="contained">
                            Send
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>

    </Box>;
};
const initialValues = {
    title: "",
    desc: "",
};
const userSchema = yup.object().shape({
    title: yup.string().required("Electrol Position Name is required"),
    desc: yup.string().required("Electorate Description is required"),
})

export default Form;
