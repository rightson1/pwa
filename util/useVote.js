import { baseUrl } from "../src/data";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const addVotes = (newVotes) => axios.post(`${baseUrl}/votes`, newVotes);

export const useVotesMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(addVotes, {
        onSuccess: (data) => {},
    });
};
const fetchVote = (reg) => axios.get(`${baseUrl}/votes?reg=${reg}`);
export const useVoteQuery = (reg) => {
    return useQuery(["vote", reg], () => fetchVote(reg), {
        staleTime: 100000,
        staleTime: 1.8e6,
        cacheTime: 1.8e6,
        select: (data) => data.data,
    });
};