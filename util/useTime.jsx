import { auth, db } from "../firebase"
import { baseUrl } from "../src/data"
import { createUserWithEmailAndPassword } from "firebase/auth"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useEffect } from "react"

const addTime = (newTime) => axios.post(`${baseUrl}/time`, newTime)

export const useTimeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addTime, {
        onSuccess: (data) => {
            queryClient.refetchQueries('time', getTime)

        }
    })
}
const updateTime = (newTime) => {
    const { id, date } = newTime
    console.log(date)
    return axios.put(`${baseUrl}/time?id=${id}`, { date })
}
export const useTimeUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation(updateTime, {
        onSuccess: (data) => {
            queryClient.refetchQueries('time', getTime)
        }
    })

}
const getTime = () => axios.get(`${baseUrl}/time`)
export const useTimeQuery = () => {
    return useQuery('time', getTime, {
        staleTime: 1.8e+6,
        cacheTime: 1.8e+6,
        select: (data) => data.data
    })
}
