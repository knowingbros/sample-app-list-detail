import apiRequestErrorHandler from "../../utilities/apiErrorHandler";

export const apiMiddleware = store => next => action => {
  if (action.type && action.type.startsWith("API_")) {
    const { callAPI, types } = action;

    typeof types.request === "function"
      ? store.dispatch(types.request) // let thunk handle it
      : store.dispatch({ type: types.request });

    return callAPI()
      .then(data =>
        typeof types.success === "function"
          ? types.success(data, store.getState, store.dispatch)
          : store.dispatch({
              type: types.success,
              data
            })
      )
      .catch(error => {
        typeof types.failure === "function"
          ? types.failure(error, store.getState, store.dispatch)
          : store.dispatch({
              type: types.failure,
              error: apiRequestErrorHandler(error)
            });

        // In case the original callers are waiting on news of how this went
        // see the CreatePost component for an example
        return Promise.reject(error);
      });
  } else {
    return next(action);
  }
};
