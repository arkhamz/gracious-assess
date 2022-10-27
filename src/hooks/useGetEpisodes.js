import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function useGetEpisodes(currentPage) {
  const [episodes, setEpisodes] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [error, setError] = useState(null);
  const [maxPages, setMaxPages] = useState(0);

  const getEpisodes = useCallback(async () => {
    setError(null);
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/episode?page=${page}`
      );
      const fetchedEpisodes = response.data.results;
      const pages = response.data.info.pages;

      if (!fetchedEpisodes) {
        throw new Error("No episodes found");
      } else {
        setEpisodes(fetchedEpisodes);
        setMaxPages(pages);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    }
  }, [page]);

  //Get episodes when page changes
  useEffect(() => {
    if (page !== currentPage) {
      setEpisodes(null);
      setPage(currentPage);
      getEpisodes();
    }
  }, [currentPage, page, getEpisodes]);

  //Get episodes on initial render
  useEffect(() => {
    if (!!currentPage && !episodes) {
      getEpisodes();
    }
  }, [episodes, getEpisodes, page, currentPage]);

  return {
    episodes,
    error,
    getEpisodes,
    maxPages,
    loading: !episodes && !error,
  };
}
