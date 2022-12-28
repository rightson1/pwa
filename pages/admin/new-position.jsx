import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useGlobalProvider } from "../../context/themeContext";
import Info from "../../components/Info"
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Title"
import axios from "axios";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/authContext";
const Form = () => {
    const { colors, baseUrl } = useGlobalProvider();
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const { admin } = useAuth()
    const [desc, setDesc] = React.useState('');

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values, { resetForm }) => {
        const data = { name: values.position, desc, admin: admin.name }
        console.log(data)
        setLoading(true)
        axios.post(`${baseUrl}/positions`, data).then(res => {
            const positionRef = doc(db, "positions", res.data._id);
            setDoc(positionRef, res.data).then(() => {
                setMessage("Position Created Successfully")
                setOpen(true)
                setLoading(false)
                resetForm()
                setDesc('')

            }).catch(() => {
                setLoading(false)
                setMessage('There Was An Error')
                setOpen(true)
            })

        }).catch(() => {
            setLoading(false)
            setMessage('There Was An Error')
            setOpen(true)
        })
    }
    return <Box m="20px">
        <Header title="NEW ELECROL POSITION" subtitle="Create a new electrol position" />

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
                            label="Electoral Position"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.position}
                            name="position"
                            error={!!touched.position && !!errors.position}
                            helperText={touched.position && errors.position}
                            sx={{
                                gridColumn: {
                                    xs: "span 4",
                                    sm: "span 4",
                                    md: "span 4",

                                }
                            }}
                        />
                        <textarea
                            type="text"
                            value={desc}
                            label="Enter question"

                            onChange={(e) => setDesc(e.target.value)}

                            style={{
                                backgroundColor: colors.primary[400],
                                gridColumn: 'span 4',

                            }} className="p-2  outline-none border-b-[1px] border-white" placeholder="Enter response" />

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
                                Create New Position
                            </Button>}
                    </Box>
                </form>
            )}
        </Formik>

        <Info open={open} setOpen={setOpen} message={message} />
    </Box>;
};
const initialValues = {
    position: "",
};
const userSchema = yup.object().shape({
    position: yup.string().required("Electrol Position Name is required"),
})
Form.getLayout = (page) => {
    return <>
        {page}
    </>
}
Form.admin = true

export default Form;
