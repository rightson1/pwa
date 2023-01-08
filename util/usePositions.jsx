import { auth, db } from "../firebase"
import { baseUrl } from "../src/data"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"

const addPositions = (newPositions) => axios.post(`${baseUrl}/positions`, newPositions)

export const usePositionsMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(addPositions, {
        onSuccess: (data) => {
            queryClient.refetchQueries('positions', getPositions)
        }
    })
}
const deletePositions = (newPositions) => axios.delete(`${baseUrl}/positions?id=${newPositions}`)
export const usePositionsDelete = () => {
    const queryClient = useQueryClient();

    return useMutation(deletePositions, {
        onSuccess: (data) => {
            queryClient.refetchQueries("positions", getPositions);
            queryClient.setQueryData("positions", (oldData) => {
                return {
                    ...oldData,
                    data: oldData.data.filter((item) => item._id !== data),
                };
            });
        }
    })
}
const updatePositions = ({ _id, values }) => axios.put(`${baseUrl}/positions?id=${_id}`, values)
export const usePositionUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation(updatePositions, {
        onSuccess: (data) => {
            queryClient.refetchQueries("positions", getPositions);
            queryClient.refetchQueries('positions', getPositions)
        }
    })
}
const fetchPosition = (positionId) => axios.get(`${baseUrl}/positions?id=${positionId}`);
export const usePositionQuery = (positionId) => {
    return useQuery(["position", positionId], () => fetchPosition(positionId), {
        staleTime: 1.8e+6,
        cacheTime: 1.8e+6,
        select: (data) => data.data
    }
    );
}
const getPositions = () => axios.get(`${baseUrl}/positions`)
export const usePositionsQuery = () => {
    return useQuery('positions', getPositions, {
        staleTime: 1.8e+6,
        cacheTime: 1.8e+6,
        select: (data) => data.data
    })
}

