import { Box } from "@mui/material";
import Header from "../../components/Title"
import { useGlobalProvider } from "../../context/themeContext"
import Grid from "../../components/Candidates";
const Candidates = () => {
    const { colors } = useGlobalProvider()
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
Candidates.admin = true
Candidates.head = "Candidates"


export default Candidates;