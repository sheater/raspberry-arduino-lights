import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [ applyMiddleware(sagaMiddleware) ];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	middleware.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(reducer, compose(...middleware));

sagaMiddleware.run(rootSaga);

export default store;
