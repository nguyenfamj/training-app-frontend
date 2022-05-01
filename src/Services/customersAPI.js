import axios from 'axios';
import { useQuery } from 'react-query';
import { CUSTOMERS_QUERY_KEY, CUSTOMERS_QUERY_URL } from '../Constants/apiConstants';

export const useCustomersQuery = () => {
  return useQuery(
    CUSTOMERS_QUERY_KEY,
    async () => await (await axios.get(CUSTOMERS_QUERY_URL)).data,
    { refetchOnWindowFocus: false }
  );
};
