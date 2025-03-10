import React from "react";
import { createRoot } from "react-dom/client";
import Frame from "./Frame";
import Provider from "../providers/WagmiProvider";

const root = createRoot(document.getElementById("app"));
root.render(
  <Provider>
    <Frame />
  </Provider>
);
