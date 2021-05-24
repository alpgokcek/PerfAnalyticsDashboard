import { GET_METRICS, PENDING, FULFILLED, REJECTED } from "../../../app-consts";
import { METRICS_INITIAL_STATE, MOCK_METRIC } from "../../../test/consts";
import metricsReducer from "./index";

describe("unit tests for cart reducer", () => {
  it("should return initial state object when state and action is undefined", () => {
    expect(metricsReducer(undefined, {})).toEqual(METRICS_INITIAL_STATE);
  });

  it("should update the state on PENDING by fetching the metrics", () => {
    const expectedAction = {
      type: `${GET_METRICS}${PENDING}`,
      payload: [MOCK_METRIC],
    };
    expect(metricsReducer(METRICS_INITIAL_STATE, expectedAction)).toEqual({
      ...METRICS_INITIAL_STATE,
    });
  });
  it("should update the state on FULFILLED by fetching the metrics", () => {
    const expectedAction = {
      type: `${GET_METRICS}${FULFILLED}`,
      payload: [MOCK_METRIC, MOCK_METRIC],
    };
    expect(metricsReducer(METRICS_INITIAL_STATE, expectedAction)).toEqual({
      ...METRICS_INITIAL_STATE,
      metrics: [...expectedAction.payload],
    });
  });
  it("should update the state on REJECTED by fetching the metrics", () => {
    const expectedAction = {
      type: `${GET_METRICS}${REJECTED}`,
      payload: [MOCK_METRIC],
    };
    expect(metricsReducer(METRICS_INITIAL_STATE, expectedAction)).toEqual({
      ...METRICS_INITIAL_STATE,
    });
  });
});
