import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.svg";
import networkLogo from "../assets/network.svg";
import Button from "../components/Button";
import { Route } from "../types";
import { useUser } from "../context/UserContext";

interface CardProps {
    title: string;
}

const Card: FC<PropsWithChildren<CardProps>> = ({ title, children }) => {
    return (
        <div className="w-full p-5 rounded-[5px] bg-white">
            <div className="mb-[40px] text-pink-600 text-3xl font-light underline">
                {title}
            </div>
            <div className="text-neutral-500">{children}</div>
        </div>
    );
};

const AboutUs: FC = () => {
    return (
        <div className="w-full flex flex-col justify-between">
            <div className="text-4xl font-bold underline">About us</div>
            <div className="mt-[38px]">
                Welcome to Authentiscan - a revolutionary leap into the future
                of product verification and trust. At Authenticity, we are
                dedicated to reshaping the way authenticity is perceived and
                ensuring a world where consumers and businesses can engage with
                confidence.
            </div>
            <div className="mt-[82px] flex justify-between gap-10">
                <Card title="Our Vision">
                    In a world plagued by counterfeiting and uncertainty, our
                    vision is crystal clear: to establish a new standard of
                    trust and transparency in the market. We believe that every
                    product should come with a guarantee of authenticity, and
                    every consumer should have the power to make informed
                    choices.
                </Card>
                <Card title="Our Journey">
                    The seeds of Authenticity were planted when a group of
                    passionate innovators came together with a shared goal: to
                    create an unbreakable bond between consumers and the
                    products they love. Our journey began with extensive
                    research into cutting-edge technologies, leading us to the
                    world of blockchain.
                </Card>
                <Card title="The Blockchain Revolution">
                    Blockchain, especially Ethereum, stood out as the foundation
                    of our platform. Its tamper-proof nature and decentralized
                    architecture offered the ideal solution for storing
                    unalterable product records. By harnessing the power of
                    blockchain, we've eliminated doubts and uncertainties,
                    replacing them with undeniable authenticity.
                </Card>
            </div>
            <div className="mt-[130px]">
                <div className="text-4xl font-bold">
                    Empowering Businesses, Building Credibility
                </div>
                <div className="text-neutral-700 mt-[38px] mb-[48px]">
                    Authenticity is not just for consumers; it's a platform
                    where businesses thrive too. We empower companies to
                    showcase their products and demonstrate their commitment to
                    authenticity. Through our dual-level verification process,
                    businesses can elevate their credibility and stand out in a
                    market flooded with doubts.
                </div>
                <div className="text-neutral-700 text-2xl ">
                    We invite you to be a part of the authentication revolution.
                    Together, we are transforming the market into a secure,
                    honest, and credible landscape. Whether you're a consumer
                    seeking trust or a business striving for credibility,
                    Authenticity welcomes you to a new era of assurance.
                </div>
            </div>
        </div>
    );
};

const Hero: FC = () => {
    const navigate = useNavigate();
    const { manufacturer } = useUser();

    return (
        <div className="w-full h-[432px] grid grid-cols-2">
            <div className="w-full flex items-center">
                <div className="w-[80%]">
                    <span className="text-5xl font-medium">
                        Pioneering Trust in Every Scan
                        <br />
                    </span>
                    <span className="text-4xl font-bold">
                        <br />
                    </span>
                    <span className="text-[32px] font-normal">
                        Redefining Authenticity with Authentiscan!
                        <br />
                    </span>
                    <div className="mt-[40px] flex gap-[40px]">
                        <Button
                            title={
                                manufacturer
                                    ? manufacturer?.isVerified
                                        ? `Register Products`
                                        : `Profile`
                                    : `Register`
                            }
                            onclick={() => {
                                if (manufacturer) {
                                    if (manufacturer.isVerified) {
                                        navigate(Route.ADD_PRODUCTS);
                                    } else {
                                        navigate(Route.PROFILE);
                                    }
                                } else {
                                    navigate(Route.REGISTER);
                                }
                            }}
                        />
                        <Button
                            secondary
                            title="Check Authenticity"
                            onclick={() => navigate(Route.CHECK_AUTHENTICITY)}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <img className="w-[30%]" src={logo} alt="authentiscan logo" />
            </div>
        </div>
    );
};

const PointCard: FC<PropsWithChildren<CardProps>> = ({ title, children }) => {
    return (
        <div className="w-[326px] p-[18px] bg-white rounded shadow border border-blue-900">
            <div className="text-center mb-3 font-semibold">{title}</div>
            <ul className="w-full flex flex-col items-center justify-center gap-6 list-disc ml-[18px] pr-[18px]">
                {children}
            </ul>
        </div>
    );
};

const HowItWorks: FC = () => {
    return (
        <div className="w-full mt-[150px] relative flex justify-center">
            <div
                id="#howItWorks"
                className="text-4xl font-bold underline mt-[82px] absolute left-0"
            >
                How it Works
            </div>
            <div className="w-[1500px]">
                <img className="w-full" src={networkLogo} alt="network" />
            </div>
            <div className="absolute top-[300px] left-[220px]">
                <PointCard title="Revolutionary Verificatoin Process">
                    <li>
                        Users experience a groundbreaking way to confirm product
                        authenticity.
                    </li>
                    <li>
                        Innovative blockchain technology, specifically Ethereum,
                        guarantees unalterable records.
                    </li>
                    <li>
                        Our platform disrupts traditional methods, ensuring
                        trust and transparency like never before.
                    </li>
                </PointCard>
            </div>
            <div className="absolute top-[400px] left-[690px]">
                <PointCard title="Sparkling the Transformation of Authentication">
                    <li>
                        We're not just a platform; we're catalysts for an
                        authentication revolution.
                    </li>
                    <li>
                        Seamlessly merging user-friendliness with cutting-edge
                        technology.
                    </li>
                    <li>
                        Together, we're reshaping authenticity verification,
                        paving the way for a more secure and honest market
                        landscape.
                    </li>
                </PointCard>
            </div>
            <div className="absolute top-[0px] left-[900px]">
                <PointCard title="Empowering Companies, Ensuring Credibility">
                    <li>
                        Companies embrace the future by showcasing their
                        products on our platform.
                    </li>
                    <li>
                        Decentralized autonomous teams introduce dual-level
                        verification, elevating company credibility.
                    </li>
                    <li>
                        A dynamic blend of automation and blockchain security
                        assures users and partners alike.
                    </li>
                </PointCard>
            </div>
            <div className="absolute top-[430px] left-[1200px]">
                <PointCard title="Blockchain's Unyielding Data Fortress">
                    <li>
                        Our platform leverages Ethereum's robust blockchain,
                        safeguarding information.
                    </li>
                    <li>
                        Product data, endorsements, and verifications are etched
                        in an immutable ledger.
                    </li>
                    <li>
                        Say goodbye to doubts and uncertainties. Welcome to an
                        era of tamper-proof certainty.
                    </li>
                </PointCard>
            </div>
        </div>
    );
};

const Home: FC = (): JSX.Element => {
    return (
        <div className="flex flex-grow bg-gradient-to-tr from-white to-slate-300">
            <div className="w-full h-full px-10 mt-[70px] mb-[155px]">
                <Hero />
                <AboutUs />
                <HowItWorks />
            </div>
        </div>
    );
};

export default Home;
