import axios from 'axios';
import { useQuery } from 'react-query';
import { TRAININGS_QUERY_KEY, TRAININGS_QUERY_URL } from '../Constants/apiConstants';

export const useTrainingsQuery = () => {
  return useQuery(
    TRAININGS_QUERY_KEY,
    async () => await (await axios.get(TRAININGS_QUERY_URL)).data,
    { refetchOnWindowFocus: false }
  );
};
