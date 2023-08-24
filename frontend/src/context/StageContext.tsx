import {
    createContext,
    FC,
    PropsWithChildren,
    useState,
    useContext,
    Dispatch,
    SetStateAction,
} from "react";

import { ProgressProps } from "../types";

interface StageContextI {
    stage: ProgressProps["stage"];
    setStage: Dispatch<SetStateAction<ProgressProps["stage"]>>;
}

const StageContext = createContext<StageContextI | null>(null);

const StageContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [stage, setStage] = useState<ProgressProps["stage"]>("details");

    return (
        <StageContext.Provider value={{ stage, setStage }}>
            {children}
        </StageContext.Provider>
    );
};

const useStage = () => {
    return useContext(StageContext);
};

export { useStage, StageContextProvider };
