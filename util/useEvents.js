import { auth, db } from "../firebase";
import { baseUrl } from "../src/data";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";

const addEvents = (newEvents) => axios.post(`${baseUrl}/events`, newEvents);

export const useEventsMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addEvents, {
        onSuccess: (data) => {
            queryClient.refetchQueries("events", getEvents);
            // queryClient.setQueryData("events", (oldData) => {
            //     return {
            //         ...oldData,
            //         data: [...oldData.data, data.data],
            //     };
            // });
        },
    });
};
const deleteEvents = (newEvents) =>
    axios.delete(`${baseUrl}/events?id=${newEvents}`);
export const useEventsDelete = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteEvents, {
        onSuccess: (data) => {
            queryClient.refetchQueries("events", getEvents);
            queryClient.setQueryData("events", (oldData) => {
                return {
                    ...oldData,
                    data: oldData.data.filter((item) => item.id !== data),
                };
            });
        },
    });
};
const getEvents = () => axios.get(`${baseUrl}/events`);
export const useEventsQuery = () => {
    return useQuery("events", getEvents, {
        staleTime: 1.8e6,
        cacheTime: 1.8e6,
        select: (data) => data.data,
    });
};