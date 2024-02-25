import { useState, useEffect, useCallback } from "react";

export const sendHttpRequest = async (url, config) => {
  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something went wrong, failed to fetch data"
    );
  }

  const resData = await response.json();
  return resData;
};

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Initialize error state with null

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (!config || config.method === "GET" || !config.method) {
      sendRequest();
    }
  }, [sendRequest, config, url]); // Include 'url' in dependencies

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
