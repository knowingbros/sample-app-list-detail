import 'bootstrap/dist/css/bootstrap.css'
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./redux/store";
import WebFont from "webfontloader";
import NavBarContainer from "./containers/NavBarContainer";
import "./index.css";

WebFont.load({
    google: {
        families: ["Poppins:400,500,700", "Roboto Slab:400,700", "Noto Sans"]
    }
});

Sentry.init({
    dsn: "https://d3394988a3194b6498ed0f376d68672e@o1373806.ingest.sentry.io/6715280",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <NavBarContainer />
                    <App/>
                    <div className="whole-page">
                    </div>
                </Router>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
