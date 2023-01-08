import React, { useEffect } from 'react';
import { useGlobalProvider } from "../../context/themeContext";
import Header from "../../components/Title";
import dynamic from "next/dynamic";
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useCandidatesUpdate } from '../../util/useCandidate';
import { useAuth } from '../../context/authContext';
import Info from "../../components/Info"
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
const Candidate = () => {
    const [bio, setBio] = React.useState('')
    const [manifesto, setManifesto] = React.useState('<div><div>');
    const [message, setMessage] = React.useState("");
    const [opened, setOpened] = React.useState(false);
    const { voter } = useAuth();
    const { mutate, isLoading, isSuccess, isError } = useCandidatesUpdate()
    const submit = () => {
        const values = { manifesto, bio }
        mutate({ reg: voter.reg, values })
    }

    const { colors } = useGlobalProvider();
    useEffect(() => {
        if (isSuccess) {
            setMessage('success🥂')
            setOpened(true)

        }
        if (isError) {
            setMessage('Error😢')
            setOpened(true)
        }
    }, [isSuccess, isError])

    return <Box m="20px">
        <Header title="CANDIDATE PAGE" subtitle="Tell Your Voters About You" />
        <Box my={3}>
            <Typography fontWeight="h6" color={colors.greenAccent[400]}>Enter Your Bio</Typography>

            <textarea
                type="text"
                value={bio}
                label="Enter Bio"

                onChange={(e) => setBio(e.target.value)}

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

                <QuillNoSSRWrapper placeholder="Enter position details...." theme="snow" modules={modules} formats={formats} onChange={(e) => setManifesto(e)} />

                <Box display="flex" justifyContent="end" mt="50px">
                    {isLoading ? <Button type="button" sx={{
                        color: colors.grey[100],
                        backgroundColor: colors.primary[400] + " !important",
                        opacity: 0.5 + " !important",
                    }} variant="contained">
                        Loading...
                    </Button> :
                        <Button type="submit" sx={{
                            color: colors.grey[100],
                            backgroundColor: colors.primary[400] + " !important",
                        }} variant="contained"
                            onClick={submit}
                        >
                            Submit You Details
                        </Button>}
                </Box>
            </Box>

        </Box>
        <Info open={opened} setOpen={setOpened} message={message} />
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
