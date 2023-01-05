import * as React from 'react';
import { useGlobalProvider } from "../../context/themeContext";
import Header from "../../components/Title";
import dynamic from "next/dynamic";

import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
const Candidate = () => {
    const { loading, setLoading } = React.useState(false)
    const { colors } = useGlobalProvider();
    const [desc, setDesc] = React.useState('');
    return <Box m="20px">
        <Header title="CANDIDATE PAGE" subtitle="Tell Your Voters About You" />
        <Box my={3}>
            <Typography fontWeight="h6" color={colors.greenAccent[400]}>Enter Your Bio</Typography>

            <textarea
                type="text"
                value={desc}
                label="Enter Bio"

                onChange={(e) => setDesc(e.target.value)}

                style={{
                    backgroundColor: colors.primary[400],
                    width: "100%",

                }} className="p-2  outline-none border-b-[1px] border-white" placeholder="Enter you bio" />
            <Box sx={{
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

                <Typography fontWeight="h6" color={colors.greenAccent[400]}>Enter Your Manifesto (use Light Mode)</Typography>

                <QuillNoSSRWrapper placeholder="Enter position details...." theme="snow" modules={modules} formats={formats} onChange={(e) => console.log(e)} />

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
                            Submit You Details
                        </Button>}
                </Box>
            </Box>
        </Box>
    </Box>
};
Candidate.getLayout = (page) => {
    return <>
        {page}
    </>
}
Candidate.voter = true

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

        matchVisual: false,
    },
}

export default Candidate;
