import { useState } from "react";
import axios from "axios";
import config from "../config/config";

const { BEARER_TOKEN, CLIENT_ID } = config;

const mergeHeaders = (customHeaders: object | undefined) => {
  const headers: any = {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "Client-Id": CLIENT_ID,
    ...customHeaders,
  };

  return headers;
};

const getRequest = (type: string) => {
  const handlers: any = {
    get: ({ url, headers }: any) => axios.get(url, { headers }),
    post: ({ url, body, headers }: any) => axios.post(url, body, { headers }),
    put: ({ url, body, headers }: any) => axios.put(url, body, { headers }),
    del: ({ url, headers }: any) => axios.delete(url, { headers }),
  };

  return handlers[type];
};

const useAxios = () => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async ({
    baseUrl,
    url,
    method,
    body,
    customHeaders,
  }: any) => {
    axios.defaults.baseURL = baseUrl;
    const headers = mergeHeaders(customHeaders);

    // Cleanup
    setError(null);
    setResponse(null);
    setLoading(true);

    try {
      const handler = getRequest(method);
      const { data } = await handler({ url, body, headers });

      setResponse(data);
    } catch (err: any) {
      const { response: errorResponse } = err;
      setError(errorResponse);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, fetchData };
};

export default useAxios;
