import { baseUrl } from "../src/data"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"



const getVoters = () => axios.get(`${baseUrl}/voters`).then(res => res.data)
export const useVotersQuery = () => useQuery('voters', getVoters, {
    staleTime: 1.8e6,
    cacheTime: 1.8e6,
})


