// @ts-ignore
import React, {Suspense} from 'react';
// @ts-ignore
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
// @ts-ignore
import MyRouter from "./router/MyRouter.tsx";
import {Spin} from "antd";
window.addEventListener('error', ()=>{})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Suspense fallback={<Spin />}>
        <MyRouter>
        </MyRouter>
      </Suspense>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
