import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App.jsx';
import noteReducer from "./reducers/noteReducer";
import filterReducer from './reducers/filterReducer.js';

if (import.meta.hot) {
  import.meta.hot.on(
    "vite:beforeUpdate",
    () => console.clear()
  );
}

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
});

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);