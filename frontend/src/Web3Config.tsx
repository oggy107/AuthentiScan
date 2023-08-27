import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { FC, PropsWithChildren } from "react";
import { configureChains, createConfig, WagmiConfig, Chain } from "wagmi";

const AlchemySepolia = {
    id: 11155111,
    name: "Alchemy Sepolia",
    network: "sepolia",
    nativeCurrency: {
        name: "Sepolia Ether",
        symbol: "SEP",
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: [
                "https://eth-sepolia.g.alchemy.com/v2/" +
                    import.meta.env.VITE_ALCHEMY_API_KEY,
            ],
        },
        public: {
            http: [
                "https://eth-sepolia.g.alchemy.com/v2/" +
                    import.meta.env.VITE_ALCHEMY_API_KEY,
            ],
        },
    },
} satisfies Chain;

const chains = [AlchemySepolia];
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
