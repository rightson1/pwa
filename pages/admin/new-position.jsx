import React from "react";
import dynamic from "next/dynamic";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useGlobalProvider } from "../../context/themeContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditorToolbar from "../../components/Editor";
import Header from "../../components/Title"
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})



const Form = () => {


    const { colors } = useGlobalProvider();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values) => {
        console.log(values)
    }
    return <Box m="20px">
        <Header title="CREATE USER" subtitle="Create a new User Profile" />

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
                                    md: "span 2",

                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Short Description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.shortDesc}
                            name="shortDesc"
                            error={!!touched.shortDesc && !!errors.shortDesc}
                            helperText={touched.shortDesc && errors.shortDesc}
                            sx={{
                                gridColumn: {
                                    xs: "span 4",
                                    sm: "span 4",
                                    md: "span 2",

                                }
                            }
                            }
                        />

                        <Box sx={{
                            gridColumn: "span 4",

                            '& .quill': {
                                background: colors.primary[400],
                                '& .ql-toolbar': {
                                    border: 'none',
                                    '& > select': {
                                        color: `${colors.grey[100]} !important`,
                                    },
                                },
                                '& .ql-container': {
                                    border: 'none',
                                    color: colors.grey[100]
                                },

                            }

                        }} mt={2} display="flex" flexDirection="column" gap={2}  >
                            <Typography variant="h5" fontWeight="bold" color={colors.greenAccent[400]}>ALL SEAT DETAIS</Typography>

                            <QuillNoSSRWrapper placeholder="Enter position details...." theme="snow" modules={modules} formats={formats} onChange={(e) => console.log(e)} />
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="end" mt="50px">
                        <Button type="submit" sx={{
                            color: colors.grey[100],
                            backgroundColor: colors.primary[400] + " !important",
                        }} variant="contained">
                            Create New Position
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>

    </Box>;
};
const initialValues = {
    position: "",
    shortDesc: "",
    shortDesc: "",
    contact: "",
    address1: "",
    address2: "",
};
const userSchema = yup.object().shape({
    position: yup.string().required("Electrol Position Name is required"),
    shortDesc: yup.string().required("Electorate Description is required"),
})
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]
const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],

        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}
export default Form;
