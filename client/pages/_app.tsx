import "@/styles/globals.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { mainnet, goerli } from "wagmi/chains";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { Route, Router } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "./dashboard";
import Home from "./Home";
import { Switch } from "@material-ui/core";

const { chains, provider } = configureChains(
  [mainnet, goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Hashstack",
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Router {...pageProps}>
          <Switch {...pageProps}>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/dashboard">
              <Navbar />
              <Dashboard />
            </Route>
          </Switch>
        </Router>
        <Component {...pageProps} />{" "}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
