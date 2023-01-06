import { baseUrl } from "../src/data";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const addCandidates = (newCandidates) => axios.post(`${baseUrl}/candidates`, newCandidates);
export const useCandidatesMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addCandidates, {
        onSuccess: (data) => {
            queryClient.refetchQueries("candidates", getCandidates);
        },
    });
};
const deleteCandidates = (newCandidates) =>
    axios.delete(`${baseUrl}/candidates?id=${newCandidates}`);
export const useCandidatesDelete = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteCandidates, {
        onSuccess: (data) => {
            queryClient.refetchQueries("candidates", getCandidates);
            queryClient.setQueryData("candidates", (oldData) => {
                return {
                    ...oldData,
                    data: oldData.data.filter((item) => item.id !== data),
                };
            });
        },
    });
};
const getCandidates = () => axios.get(`${baseUrl}/candidates`);
export const useCandidatesQuery = () => {
    return useQuery("candidates", getCandidates, {
        staleTime: 1.8e6,
        cacheTime: 1.8e6,
        select: (data) => data.data,
    });
};
const fetchCandidates = (positionId) => axios.get(`${baseUrl}/candidates?id=${positionId}`);
export const usePositionCandidateQuery = (positionId) => {
    return useQuery(["candidates", positionId], () => fetchCandidates(positionId), {
        staleTime: 100000,
        staleTime: 1.8e+6,
        cacheTime: 1.8e+6,
        select: (data) => data.data
    }
    );
}