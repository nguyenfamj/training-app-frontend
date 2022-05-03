import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CUSTOMERS_QUERY_KEY, CUSTOMERS_QUERY_URL } from '../Constants/apiConstants';

export const useCustomersQuery = () => {
  return useQuery(
    CUSTOMERS_QUERY_KEY,
    async () => await (await axios.get(CUSTOMERS_QUERY_URL)).data,
    { refetchOnWindowFocus: false }
  );
};

export const useSingleCustomerQuery = (CUSTOMER_QUERY_KEY, CUSTOMER_QUERY_URL) => {
  return useQuery(
    CUSTOMER_QUERY_KEY,
    async () => await (await axios.get(CUSTOMER_QUERY_URL)).data,
    { refetchOnWindowFocus: false }
  );
};

export const useCustomerEditMutation = () => {
  const queryClient = useQueryClient();
  const config = { headers: { 'Content-Type': 'application/json' } };

  return useMutation(
    ({ customerUrl, data }) => {
      return axios.put(customerUrl, data, config);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CUSTOMERS_QUERY_KEY);
      },
    }
  );
};

export const useCustomerAddMutation = () => {
  const queryClient = useQueryClient();
  const config = { headers: { 'Content-Type': 'application/json' } };

  return useMutation(
    ({ data }) => {
      return axios.post(CUSTOMERS_QUERY_URL, data, config);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CUSTOMERS_QUERY_KEY);
      },
    }
  );
};
