import { GET_METRICS } from "../../../app-consts";
import { axiosInstance } from "../../../utils";

export const getMetrics = (queryFilters = {}) => {
  return (dispatch) => {
    let query = "";
    if (Object.keys(queryFilters).length === 2) {
      query = `?startDate=${queryFilters.start.toISOString()}&endDate=${queryFilters.end.toISOString()}`;
    }
    return Promise.resolve(
      dispatch({
        type: GET_METRICS,
        payload: axiosInstance
          .get(`/metrics${query}`)
          .then(async (res) => res.data.data),
      })
    ).catch((e) => {
      return e;
    });
  };
};
