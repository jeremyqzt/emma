import { Octokit } from "@octokit/core";
import { useEffect, useState, useRef } from "react";
const octokit = new Octokit();

export const useApi = (url) => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const refresh = () => {
    setRefreshIndex(refreshIndex + 1);
  };

  useEffect(() => {
    let cancelled = false;
    if (url) {
      setLoading(true);
      octokit
        .request(url)
        .then((resp) => {
          if (!cancelled) {
            setResult(resp);
            setLoading(false);
          }
        })
        .catch((err) => {
          setResult(err);
          setLoading(false);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [url, refreshIndex]);

  return [result, loading, refresh];
};

export const useFetch = (url, skip, skipReason = "") => {
  const cache = useRef({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    let cancelled = false;

    if (skip) {
      setData(skipReason);
      return;
    }
    if (!url) return;
    const fetchData = async () => {
      setLoading(true);
      if (cache.current[url]) {
        const data = cache.current[url];
        setData(data);
        setLoading(false);
      } else {
        fetch(url)
          .then((resp) => {
            return resp.text();
          })
          .then((resp) => {
            if (!cancelled) {
              setData(resp);
              setLoading(false);
            }
          })
          .catch((err) => {
            setData(err);
            setLoading(false);
          });
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [url, skip, skipReason]);

  return [data, loading];
};
