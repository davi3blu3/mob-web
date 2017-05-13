import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import appReducer from "redux-root/reducers/app";

const store = createStore(appReducer, { }, compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
