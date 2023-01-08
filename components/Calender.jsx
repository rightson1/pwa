import React, { useEffect } from "react";
import Header from "./Title";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { formatDate } from "fullcalendar";
import Info from "./Info";
import Flex from "./Flex";
import { useGlobalProvider } from "../context/themeContext";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { db } from "../firebase";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import axios from "axios";
import { useEventsDelete, useEventsMutation, useEventsQuery } from "../util/useEvents";
const Calender = () => {
    // const [currentEvents, setCurrentEvents] = React.useState([])
    const [message, setMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const { mutate, isSuccess: added, isError: failed } = useEventsMutation()
    const { data, isLoading } = useEventsQuery()
    const { mutate: deleteEvent, isSuccess, isError } = useEventsDelete()
    const { colors, baseUrl, setChange, change, events } = useGlobalProvider();

    const handleDateClick = (selected) => {
        const title = prompt("Enter Event Title");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();
        if (title) {
            calendarApi.addEvent({
                id: Date.now(),
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay
            })
        }
    }

    const handleEventClick = (selected) => {
        if (window.confirm(`Are you sure you want to delete ${selected.event.title}`)) {
            selected.event.remove();
        }
    }
    const handleEvent = (event) => {
        const { id, title, startStr: start, endStr: end, allDay } = event.event;
        const data = { id, title, start, end, allDay }
        mutate(data)

    }
    useEffect(() => {
        if (added) {
            setMessage("Event Saved To Database Successfully")
            setOpen(true)

        } else if (failed) {
            setMessage('There Was An Error')
            setOpen(true)

        }
    }, [added, failed])
    const handleDelete = (event) => {
        const { id } = event.event;
        deleteEvent(id)
        if (isSuccess) {
            setMessage("Event Deleted From Database Successfully")
            setOpen(true)
        } else if (isError) {
            setMessage('There Was An Error')
            setOpen(true)
        }


    }
    return <Flex sx={{
        mt: "4rem",
        flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
        },
        alignItems: {
            sm: "center",
            md: "start",
        },
        gap: {
            xs: '2rem',
            sm: "2rem",
            md: ".5rem",


        }

    }} >
        <Box sx={{

            backgroundColor: colors.primary[400],
            height: '300px',
            width: '100%',
            overflow: 'auto',
            p: "1rem",
            flex: {
                sm: undefined,
                md: "1 1 30%",
            }

        }}  >
            <Typography>Events</Typography>
            <List
            >
                {data?.length > 0 ?
                    data?.map((event) => (
                        <ListItem key={event.id} sx={
                            {
                                backgroundColor: colors.greenAccent[500],
                                margin: "10px 0",
                                borderRadius: "2px",
                            }
                        }>

                            <ListItemText primary={event.title}
                                secondary={
                                    <Typography>
                                        {formatDate(event.start,
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    )
                    ) :
                    isLoading ?

                        <>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                                    <Stack spacing={.5} key={index} mb="2rem">
                                        <Skeleton variant="rounded" width="100%" height={60} />
                                    </Stack>
                                ))
                            }
                        </> :
                        <Typography>No Events Added</Typography>
                }

            </List>
        </Box>
        <Box flex={
            {
                sm: undefined,
                md: "1 1 100%",
            }
        } ml="15px"
            sx={{
                width: '100%',
                '& .fc-license-message': {
                    display: 'none',
                },

                '& .fc-header-toolbar': {
                    mx: {
                        xs: '1rem !important',
                        md: '0 !important',
                    }
                },
                '& .fc-button-group': {
                    display: 'flex !important',
                    '& button': {
                        background: colors.primary[400],
                        width: '80px'
                    },
                    gap: {
                        xs: '2px !important',

                        md: '0 !important',
                    },
                    flexDirection: {
                        xs: 'column !important',
                        sm: 'column !important',
                        md: 'row !important',
                    }
                },
                '& .fc-toolbar-title': {
                    fontSize: {
                        xs: '15px !important',
                        sm: '8px !important',
                        md: '1rem !important',

                    },

                },

            }}

        >
            <FullCalendar
                height="75vh"
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                ]}
                headerToolbar={{
                    left: "prev,next,today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                // eventsSet={(events) => setCurrentEvents(events)}
                eventAdd={handleEvent}
                eventChange={function () { }}
                eventRemove={handleDelete}
                longPressDelay={1}
                events={data}
            />

        </Box>

        <Info open={open} setOpen={setOpen} message={message} />
    </Flex>
};

export default Calender;
