import React from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useGlobalProvider } from "../../context/themeContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Title"
import InputAdornment from "@mui/material/InputAdornment";
import Info from "../../components/Info"
import SearchIcon from "@mui/icons-material/Search";
import { db } from "../../firebase";
import { collection, addDoc, doc } from "firebase/firestore";
const Form = () => {
    const [ans, setAns] = React.useState('');
    const { colors, baseUrl } = useGlobalProvider();
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values, { resetForm }) => {
        const data = { title: values.title, desc: ans }

        const colRef = collection(db, "notifications");
        addDoc(colRef, data).then(() => {
            setMessage("Notification Created Successfully")
            setOpen(true)
            setLoading(false)
            resetForm()
            setAns('')
        }).catch(() => {
            setLoading(false)
            setMessage('There Was An Error')
            setOpen(true)
        })


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
                            label="Enter Notification title"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.title}
                            name="title"
                            error={!!touched.title && !!errors.title}
                            helperText={touched.title && errors.title}
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

                            }} className="p-2  outline-none border-b-[1px] border-white" placeholder="Enter description" />
                    </Box>
                    <Box display="flex" justifyContent="end" mt="50px">
                        {loading ? <Button type="button" sx={{
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
                                Create New Notification
                            </Button>}
                    </Box>
                </form>
            )}
        </Formik>
        <Info open={open} setOpen={setOpen} message={message} />

    </Box>;
};
const initialValues = {
    title: "",
};
const userSchema = yup.object().shape({
    title: yup.string().required("Notification title is required"),

})

export default Form;

