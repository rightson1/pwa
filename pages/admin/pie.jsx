import React, { useEffect } from "react";
import PieChart from "../../components/PieChart";
import Box from "@mui/material/Box";
import Header from "../../components/Title";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import { usePositionsQuery } from "../../util/usePositions";
import axios from "axios";
import { useGlobalProvider } from "../../context/themeContext";
import { Typography } from "@mui/material";

const Pie = () => {
    const [position, setPosition] = React.useState('');
    const [votes, setVotes] = React.useState([]);
    const { baseUrl } = useGlobalProvider()

    const handleChange = (event) => {
        setPosition(event.target.value);
    };
    const { data: positions } = usePositionsQuery();
    useEffect(() => {
        if (positions?.length > 0) {
            setPosition(positions[0].name)
        }
    }, [positions])
    useEffect(() => {
        if (!position) return
        axios.get(`${baseUrl}/votes?position=${position}`).then((res) => {
            setVotes(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [position])

    return (
        <Box m="20px">
            <Header title="Results In Pie Chart " subtitle="Select Position To View Results" />

            <FormControl sx={{
                my: 3
            }}>
                <InputLabel id="demo-simple-select-autowidth-label">Position</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={position}
                    onChange={handleChange}
                    fullWidth
                    label="Age"
                    readOnly={false}
                    defaultValue="President"

                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {positions?.map((position) => (
                        <MenuItem value={position.name} key={position._id}  >{position.name}</MenuItem>
                    ))}

                </Select>
                <FormHelperText>Select Position</FormHelperText>
            </FormControl>
            <Box height="75vh">
                {!position ?
                    <Typography>Please Select Category</Typography>
                    :

                    votes.length > 0 ? <PieChart votes={votes} /> :
                        <Skeleton variant="rectangular" width="100%" height="100%" />
                }
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
