import { useState } from "react";

export function useFetch(baseURL) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (endpoint, method = "GET", body = null) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseURL}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });

      const data = await res.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { loading, error, request };
}
