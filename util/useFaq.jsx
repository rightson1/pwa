import { auth, db } from "../firebase"
import { baseUrl } from "../src/data"
import { createUserWithEmailAndPassword } from "firebase/auth"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useEffect } from "react"

const addFaq = (newFaq) => axios.post(`${baseUrl}/faq`, newFaq)

export const useFaqMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addFaq, {
        onSuccess: (data) => {
            queryClient.refetchQueries('faqs', getFaqs)
            queryClient.setQueryData('faqs', (oldData) => {
                return {
                    ...oldData,
                    data: [...oldData.data, data.data]
                }

            })
        }
    })
}
const deleteFaq = (newFaq) => axios.delete(`${baseUrl}/faq?id=${newFaq}`)
export const useFaqDelete = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteFaq, {
        onSuccess: (data) => {
            queryClient.refetchQueries('faqs', getFaqs)
            queryClient.setQueryData('faqs', (oldData) => {

                return {
                    ...oldData,
                    data: oldData.data.filter((item) => item.id !== data)
                }

            })
        }
    })
}
const getFaqs = () => axios.get(`${baseUrl}/faq`)
export const useFaqQuery = () => {
    return useQuery('faqs', getFaqs, {
        staleTime: 1.8e+6,
        cacheTime: 1.8e+6,
        select: (data) => data.data
    })
}

