import React, { createContext, useContext } from "react";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 0. Setup queryClient
const queryClient = new QueryClient();

const projectId = "6a1fbd37940215489abd38edd45e9f0a";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "http:/localhost:5173", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [polygonMumbai];
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const GatewayContext = createContext();

const GatewayContextProvider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <GatewayContext.Provider value={{}}>{children}</GatewayContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default GatewayContextProvider;
export const useGatewayContext = () => useContext(GatewayContext);
