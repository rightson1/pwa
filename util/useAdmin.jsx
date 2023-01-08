import { baseUrl } from "../src/data"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"



const getAdmins = () => axios.get(`${baseUrl}/admins`).then(res => res.data)
export const useAdminQuery = () => useQuery('admins', getAdmins, {
    staleTime: 1.8e6,
    cacheTime: 1.8e6,
})

const deleteAdmin = (_id) => axios.delete(`${baseUrl}/admins?id=${_id}`)
export const useAdminDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteAdmin, {
        onSuccess: (data) => {
            queryClient.refetchQueries('admins', getAdmins)

        }
    })
}
