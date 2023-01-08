import { auth, db } from "../firebase"
import { baseUrl } from "../src/data"
import { createUserWithEmailAndPassword } from "firebase/auth"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useEffect } from "react"

const addNotification = (newNotification) => axios.post(`${baseUrl}/notification`, newNotification)

export const useNotificationMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addNotification, {
        onSuccess: (data) => {
            queryClient.refetchQueries('notifications', getNotifications)
        }
    })
}
const deleteNotification = (newNotification) => axios.delete(`${baseUrl}/notification?id=${newNotification}`)
export const useNotificationDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteNotification, {
        onSuccess: (data) => {
            queryClient.refetchQueries('notifications', getNotifications)
        }
    })
}
const getNotifications = () => axios.get(`${baseUrl}/notification`)
export const useNotificationQuery = () => {
    return useQuery('notifications', getNotifications, {
        staleTime: 1.8e+6,
        cacheTime: 1.8e+6,
        select: (data) => data.data
    })
}

