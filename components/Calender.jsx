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
const Calender = () => {
    const [currentEvents, setCurrentEvents] = React.useState([])
    const [message, setMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);


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
        const { id, title, start, end, allDay } = event.event;
        axios.post(`${baseUrl}/events`, { id, title, start, end, allDay }).then(() => {
            setMessage("Event Saved To Database Successfully")
            setOpen(true)
            setChange(!change)
        }).catch(() => {
            setMessage('There Was An Error')
            setOpen(true)
        })
    }
    const handleDelete = (event) => {
        const { id } = event.event;
        axios.delete(`${baseUrl}/events?id=${id}`).then(() => {
            setMessage("Event Deleted From Database Successfully")
            setOpen(true)
            setChange(!change)
        }).catch(() => {
            setMessage('There Was An Error')
            setOpen(true)
        })
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
                {
                    currentEvents.map((event) => (
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
                    )
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
                eventsSet={(events) => setCurrentEvents(events)}
                eventAdd={handleEvent}
                eventChange={function () { }}
                eventRemove={handleDelete}
                events={events.length > 0 && events}
            />

        </Box>

        <Info open={open} setOpen={setOpen} message={message} />
    </Flex>
};

export default Calender;
