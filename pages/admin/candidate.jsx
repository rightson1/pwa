import React from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useGlobalProvider } from "../../context/themeContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Title"
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
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
    <Header title="NEW CANDIDATE" subtitle="Still Under Construction!!!!!" />
    <Skeleton variant="rounded" width="100%" height={60} />
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
              label="Enter candidate name or ID"
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
                gridColumn: {
                  xs: "span 4",
                  sm: "span 4",
                  md: "span 2",

                }
              }}
            />

            {/* <FormControl sx={{
              gridColumn: {
                xs: "span 4",
                sm: "span 4",
                md: "span 2",

              }
            }}>
              <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={age}
                onChange={handleChange}
                fullWidth
                label="Age"
                readOnly={false}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Twenty</MenuItem>
                <MenuItem value={21}>Twenty one</MenuItem>
                <MenuItem value={22}>Twenty one and a half</MenuItem>
              </Select>
              <FormHelperText>Select Position</FormHelperText>
            </FormControl> */}
          </Box>
          <Box display="flex" justifyContent="end" mt="50px">
            <Button type="submit" sx={{
              color: colors.grey[100],
              backgroundColor: colors.primary[400] + " !important",
            }} variant="contained">
              Select
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

Form.getLayout = (page) => {
  return <>
    {page}
  </>
}
Form.admin = true
Form.head = "Candidates"

export default Form;
