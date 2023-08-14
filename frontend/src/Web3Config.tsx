import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { FC, PropsWithChildren } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { localhost } from "wagmi/chains";

const chains = [localhost];
const projectId = import.meta.env.VITE_W3M_PROJECT_ID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </>
    );
};

export default Web3Provider;
