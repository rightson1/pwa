import React, { useEffect } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CircularProgress from '@mui/material/CircularProgress';

import Info from "./Info"
import { useGlobalProvider } from '../context/themeContext';
import dateFormat from 'dateformat';
import { useCandidatesDelete } from '../util/useCandidate';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Candidate({ reg, name, created, bio, manifesto, _id, admin }) {
    const { mutate, isLoading, isError, isSuccess } = useCandidatesDelete()
    const [message, setMessage] = React.useState("");
    const [opened, setOpened] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const { colors } = useGlobalProvider()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleDelete = () => {
        mutate(_id)
    }

    useEffect(() => {
        if (isSuccess) {
            setMessage('success🥂')
            setOpened(true)

        }
        if (isError) {
            setMessage('Error😢, try again or check,candidate prolly exist')
            setOpened(true)
        }
    }, [isSuccess, isError])
    return (
        <Card sx={{ background: colors.primary[400] }}


        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {name[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={name}
                subheader={dateFormat(created, "dddd, mmmm dS, yyyy")}

            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {bio ? bio : "This Candidate has not provided a bio, please check their manifesto for more information"}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>

                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                {admin && <IconButton aria-label="add to favorites" onClick={() => handleDelete()}>
                    {isLoading ? <CircularProgress /> : <DeleteOutlineIcon />}
                </IconButton>}
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <div dangerouslySetInnerHTML={{ __html: manifesto ? manifesto : '<div>This Candidate has not added his/her manifest</div>' }} className="mt-5"></div>
                </CardContent>
            </Collapse>
            <Info open={opened} setOpen={setOpened} message={message} />
        </Card>
    );
}