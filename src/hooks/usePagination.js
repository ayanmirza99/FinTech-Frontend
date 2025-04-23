import { useState, useEffect } from "react";

const usePagination = (fetchData, initialParams = {}) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [querryParams, setQuerryParams] = useState(initialParams);
  const [data, setData] = useState({ rows: [], rowCount: 0 });

  const customEncodeURIComponent = (str) => {
    return encodeURIComponent(str).replace(/%2F/g, "/");
  };
  const getQueryString = (params) => {
    return Object.keys(params)
      .map((key) => {
        if (Array.isArray(params[key])) {
          return params[key]
            .map(
              (value) =>
                `${customEncodeURIComponent(key)}=${customEncodeURIComponent(
                  value
                )}`
            )
            .join("&");
        }
        return `${customEncodeURIComponent(key)}=${customEncodeURIComponent(
          params[key]
        )}`;
      })
      .join("&");
  };

  const getData = async () => {
    setLoading(true);
    try {
      const params = {
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
        ...querryParams,
      };
      const queryString = getQueryString(params);
      const { data } = await fetchData(queryString);
      setData({ rows: data.rows, rowCount: data.rowCount });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [paginationModel, fetchData, querryParams]);

  const refresh = () => {
    getData();
  };
  return {
    paginationModel,
    setPaginationModel,
    loading,
    data,
    refresh,
    setQuerryParams,
  };
};

export default usePagination;
