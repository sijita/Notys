// @ts-nocheck
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import { axiosClient } from "./services/apiClient";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SWRConfig
    value={{
      fetcher: (...args) => {
        return axiosClient.get(...args).then((res) => res.data);
      },
      suspense: true,
    }}
  >
    <Suspense
      fallback={
        <div className="grid grid-cols-1 place-content-center h-screen text-white bg-[#080808]">
          <p className="text-center font-bold text-5xl">Cargando...</p>
        </div>
      }
    >
      <Router>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </Router>
    </Suspense>
  </SWRConfig>
);
