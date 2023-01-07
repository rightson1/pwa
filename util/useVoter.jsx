import { baseUrl } from "../src/data"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"



const getVoters = () => axios.get(`${baseUrl}/voters`).then(res => res.data)
export const useVotersQuery = () => useQuery('voters', getVoters, {
    staleTime: 1.8e6,
    cacheTime: 1.8e6,
})
const deleteVoter = (_id) => axios.delete(`${baseUrl}/voters?id=${_id}`)
export const useVoterDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteVoter, {
        onSuccess: (data) => {
            queryClient.refetchQueries('voters', getVoters)

        }
    })
}