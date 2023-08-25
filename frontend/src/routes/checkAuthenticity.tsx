import { FC } from "react";
import Back from "../assets/icons/Back-btn.svg";
import logo from "../assets/logo.svg";
import txtlogo from "../assets/logoFull-dark.svg";

const CheckAuthenticity: FC = (): JSX.Element => {
  return (
    <div className="flex flex-grow">
      <div className="w-full h-ful flex ">
        <div className=" w-[700px] h-[620px]">
          <div className="mt-[15px] ml-[15px]">
            <img src={Back} alt="Back button" />
          </div>

          <div className="mt-[68px] ml-[272px]">
            <div>
              <span>
                <img src={txtlogo} alt="Authentiscan" />
              </span>
            </div>

            <div className="mt-[74.19px] w-[345px] h-[190px] ">
              <div className="text-gray-500 text-base font-normal ">
                AuthentiScan Let you easily verify your products using
                blockchain technology.
              </div>
              <br />
              <span className=" text-gray-700 text-base font-normal">
                It’s easy as 1 2 3:
              </span>{" "}
              <br />
              <div className="text-gray-500 text-base font-normal ">
                Select manufacturer <br />
                Enter Product unique id <br /> Hit check button <br /> <br />
                and we will search the whole universe for your product
                authenticity.
              </div>
            </div>
          </div>
        </div>

        <div className="w-[721px] h-[607px]"></div>
               
        {/* second panel */}

        <div></div>
      </div>
    </div>
  );
};

export default CheckAuthenticity;
