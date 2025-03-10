import React from "react";
import Provider from "./WagmiProvider";

export default function Providers({ children }) {
  return <Provider>{children}</Provider>;
}
