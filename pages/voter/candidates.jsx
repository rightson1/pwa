import { Box } from "@mui/material";
import Header from "../../components/Title"
import Grid from "../../components/Candidates";
const Candidates = () => {

    return (
        <Box m={{
            xs: '20px 5px',
            sm: '20px 10px ',
            md: '20px'

        }}  >
            <Header title="Candidates" subtitle="List Of Candidates" />
            <Grid />
        </Box>
    );
};
Candidates.getLayout = (page) => {
    return <>
        {page}
    </>
}
Candidates.voter = true




export default Candidates;