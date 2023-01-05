import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useGlobalProvider } from "../../context/themeContext";
import Header from "../../components/Title";
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
const Vote = () => {

    const { colors } = useGlobalProvider();
    return <Box m="20px">
        <Header title="VOTING PAGE" subtitle="You can only vote once" />
        <Box mt={2} display="flex" flexDirection="column" gap={5}>
            <FormControl>
                <FormLabel
                    disableAnimation={true}
                    sx={{
                        color: colors.greenAccent[500] + "!important",

                    }}
                    id="demo-row-radio-buttons-group-lab0el">Choose Your prefered candidate for President</FormLabel>
                <RadioGroup
                    column
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={''}
                >
                    <FormControlLabel value="Rightson" control={<Radio

                        sx={{
                            color: colors.greenAccent[500],
                            '& .MuiSvgIcon-root': {
                                color: colors.greenAccent[500],
                            },
                            '& .MuiButton-root': {
                                backgroundColor: colors.greenAccent[400] + "!important",
                            }

                        }}
                        value="myValue"
                        color="default" />} label="Rightson" />
                    <FormControlLabel value="Wakesho" control={<Radio
                        sx={{
                            color: colors.greenAccent[500],
                            '& .MuiSvgIcon-root': {
                                color: colors.greenAccent[500],
                            },
                            '& .MuiButton-root': {
                                backgroundColor: colors.greenAccent[400] + "!important",
                            }

                        }}
                    />} label="Wakesho" />
                    <FormControlLabel value="Alfred" control={<Radio

                        sx={{
                            color: colors.greenAccent[500],
                            '& .MuiSvgIcon-root': {
                                color: colors.greenAccent[500],
                            },
                            '& .MuiButton-root': {
                                backgroundColor: colors.greenAccent[400] + "!important",
                            }

                        }}
                    />} label="Alfred" />

                </RadioGroup>
                <Button sx={{
                    backgroundColor: colors.greenAccent[400] + "!important",
                    color: colors.grey[600] + "!important",
                    maxWidth: "100px",
                    '&:hover': {
                        backgroundColor: colors.greenAccent[600] + "!important",
                        color: colors.grey[100] + "!important",
                    }
                }}>Vote</Button>
            </FormControl>
            <FormControl>
                <FormLabel
                    disableAnimation={true}
                    sx={{
                        color: colors.greenAccent[500] + "!important",

                    }}
                    id="demo-row-radio-buttons-group-lab0el">Choose Your prefered candidate for President</FormLabel>
                <RadioGroup
                    column
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={''}
                >
                    <FormControlLabel value="Rightson" control={<Radio

                        sx={{
                            color: colors.greenAccent[500],
                            '& .MuiSvgIcon-root': {
                                color: colors.greenAccent[500],
                            },
                            '& .MuiButton-root': {
                                backgroundColor: colors.greenAccent[400] + "!important",
                            }

                        }}
                        value="myValue"
                        color="default" />} label="Rightson" />
                    <FormControlLabel value="Wakesho" control={<Radio
                        sx={{
                            color: colors.greenAccent[500],
                            '& .MuiSvgIcon-root': {
                                color: colors.greenAccent[500],
                            },
                            '& .MuiButton-root': {
                                backgroundColor: colors.greenAccent[400] + "!important",
                            }

                        }}
                    />} label="Wakesho" />
                    <FormControlLabel value="Alfred" control={<Radio

                        sx={{
                            color: colors.greenAccent[500],
                            '& .MuiSvgIcon-root': {
                                color: colors.greenAccent[500],
                            },
                            '& .MuiButton-root': {
                                backgroundColor: colors.greenAccent[400] + "!important",
                            }

                        }}
                    />} label="Alfred" />

                </RadioGroup>
                <Button sx={{
                    backgroundColor: colors.greenAccent[400] + "!important",
                    color: colors.grey[600] + "!important",
                    maxWidth: "100px",
                    '&:hover': {
                        backgroundColor: colors.greenAccent[600] + "!important",
                        color: colors.grey[100] + "!important",
                    }
                }}>Vote</Button>
            </FormControl>
            <FormControl>
                <FormLabel
                    disableAnimation={true}
                    sx={{
                        color: colors.greenAccent[500] + "!important",

                    }}
                    id="demo-row-radio-buttons-group-lab0el">Choose Your prefered candidate for President</FormLabel>
                <RadioGroup
                    column
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={''}
                >
                    <FormControlLabel value="Rightson" control={<Radio

                        sx={{
                            color: colors.greenAccent[500],
                            '& .MuiSvgIcon-root': {
                                color: colors.greenAccent[500],
                            },
                            '& .MuiButton-root': {
                                backgroundColor: colors.greenAccent[400] + "!important",
                            }

                        }}
                        value="myValue"
                        color="default" />} label="Rightson" />
                    <FormControlLabel value="Wakesho" control={<Radio
                        sx={{
                            color: colors.greenAccent[500],
                            '& .MuiSvgIcon-root': {
                                color: colors.greenAccent[500],
                            },
                            '& .MuiButton-root': {
                                backgroundColor: colors.greenAccent[400] + "!important",
                            }

                        }}
                    />} label="Wakesho" />
                    <FormControlLabel value="Alfred" control={<Radio

                        sx={{
                            color: colors.greenAccent[500],
                            '& .MuiSvgIcon-root': {
                                color: colors.greenAccent[500],
                            },
                            '& .MuiButton-root': {
                                backgroundColor: colors.greenAccent[400] + "!important",
                            }

                        }}
                    />} label="Alfred" />

                </RadioGroup>
                <Button sx={{
                    backgroundColor: colors.greenAccent[400] + "!important",
                    color: colors.grey[600] + "!important",
                    maxWidth: "100px",
                    '&:hover': {
                        backgroundColor: colors.greenAccent[600] + "!important",
                        color: colors.grey[100] + "!important",
                    }
                }}>Vote</Button>
            </FormControl>
            <FormControl>
                <FormLabel
                    disableAnimation={true}
                    sx={{
                        color: colors.greenAccent[500] + "!important",

                    }}
                    id="demo-row-radio-buttons-group-lab0el">Choose Your prefered candidate for President</FormLabel>
                <RadioGroup
                    column
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={''}
                >
                    <FormControlLabel value="Rightson" control={<Radio

                        sx={{
                            color: colors.greenAccent[500],
                            '& .MuiSvgIcon-root': {
                                color: colors.greenAccent[500],
                            },
                            '& .MuiButton-root': {
                                backgroundColor: colors.greenAccent[400] + "!important",
                            }

                        }}
                        value="myValue"
                        color="default" />} label="Rightson" />
                    <FormControlLabel value="Wakesho" control={<Radio
                        sx={{
                            color: colors.greenAccent[500],
                            '& .MuiSvgIcon-root': {
                                color: colors.greenAccent[500],
                            },
                            '& .MuiButton-root': {
                                backgroundColor: colors.greenAccent[400] + "!important",
                            }

                        }}
                    />} label="Wakesho" />
                    <FormControlLabel value="Alfred" control={<Radio

                        sx={{
                            color: colors.greenAccent[500],
                            '& .MuiSvgIcon-root': {
                                color: colors.greenAccent[500],
                            },
                            '& .MuiButton-root': {
                                backgroundColor: colors.greenAccent[400] + "!important",
                            }

                        }}
                    />} label="Alfred" />

                </RadioGroup>
                <Button sx={{
                    backgroundColor: colors.greenAccent[400] + "!important",
                    color: colors.grey[600] + "!important",
                    maxWidth: "100px",
                    '&:hover': {
                        backgroundColor: colors.greenAccent[600] + "!important",
                        color: colors.grey[100] + "!important",
                    }
                }}>Vote</Button>
            </FormControl>

        </Box>
    </Box>
};
Vote.getLayout = (page) => {
    return <>
        {page}
    </>
}
Vote.voter = true



export default Vote;
