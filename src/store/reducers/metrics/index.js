import { FULFILLED, GET_METRICS, PENDING, REJECTED } from "../../../app-consts";

const initialState = {
  metrics: [],
};
const metricsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_METRICS}${PENDING}`:
      return {
        ...state,
        metrics: [],
      };
    case `${GET_METRICS}${FULFILLED}`:
      return {
        ...state,
        metrics: action.payload,
      };
    case `${GET_METRICS}${REJECTED}`:
      return {
        ...state,
        metrics: [],
      };
    default:
      return state;
  }
};
export default metricsReducer;
