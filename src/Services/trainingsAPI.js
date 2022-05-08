import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { TRAININGS_QUERY_KEY, TRAININGS_QUERY_URL } from '../Constants/apiConstants';

export const useTrainingsQuery = () => {
  return useQuery(
    TRAININGS_QUERY_KEY,
    async () => await (await axios.get(TRAININGS_QUERY_URL)).data,
    { refetchOnWindowFocus: false }
  );
};

export const useAddTrainingMutation = () => {
  const queryClient = useQueryClient();
  const config = { headers: { 'Content-Type': 'application/json' } };

  return useMutation(
    ({ data }) => {
      return axios.post(TRAININGS_QUERY_URL, data, config);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(TRAININGS_QUERY_KEY);
      },
    }
  );
};

export const useDeleteTrainingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ trainingUrl }) => {
      return axios.delete(trainingUrl);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(TRAININGS_QUERY_KEY);
      },
    }
  );
};
