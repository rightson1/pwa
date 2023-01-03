import React from "react";
import PieChart from "../../components/PieChart";
import Box from "@mui/material/Box";
import Header from "../../components/Title";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';

const Pie = () => {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box m="20px">
            <Header title="Results In Pie Chart " subtitle="Still Under Construction !!!!!!" />
            <Skeleton variant="rounded" width="100%" height={10} />
            <FormControl sx={{
                my: 3
            }}>
                <InputLabel id="demo-simple-select-autowidth-label">Position</InputLabel>
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
                    <MenuItem value={10}>Chairlady</MenuItem>
                    <MenuItem value={21}>Secretary</MenuItem>
                    <MenuItem value={22}>Tresures</MenuItem>
                </Select>
                <FormHelperText>Select Position</FormHelperText>
            </FormControl>
            <Box height="75vh">
                <PieChart />
            </Box>
        </Box>
    );
};
Pie.getLayout = (page) => {
    return <>
        {page}
    </>
}
Pie.admin = true


export default Pie;
