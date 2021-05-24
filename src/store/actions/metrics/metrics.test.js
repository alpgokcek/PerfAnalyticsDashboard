import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import { FULFILLED, GET_METRICS, PENDING } from "../../../app-consts";
import { METRICS_INITIAL_STATE, MOCK_METRIC } from "../../../test/consts";
import { axiosInstance } from "../../../utils";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import { getMetrics } from "./index";
const baseState = {
  metricsReducer: {
    ...METRICS_INITIAL_STATE,
  },
};
const middlewares = [promise, thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  let store;
  beforeEach(() => {
    store = mockStore({ metricsReducer: [] });
    moxios.install(axiosInstance);
  });
  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });
  it("dispatches GET_BUCKETLISTS_FULFILLED and GET_BUCKETLISTS_PENDING on fetch bucketlists", () => {
    const payload = {
      data: [MOCK_METRIC, MOCK_METRIC],
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: payload,
      });
    });
    const expectedActions = [
      `${GET_METRICS}${PENDING}`,
      `${GET_METRICS}${FULFILLED}`,
    ];
    store = mockStore(baseState);

    return store.dispatch(getMetrics({})).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map((action) => action.type);
      expect(actionTypes).toEqual(expectedActions);
    });
  });
});
