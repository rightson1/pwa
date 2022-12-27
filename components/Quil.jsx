import React from "react";
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
import { Box, Button, TextField, Typography } from "@mui/material";
import dynamic from "next/dynamic";
const Quil = () => {
    return <Box sx={{
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
};

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

export default Quil;
