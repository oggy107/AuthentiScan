import React from 'react';
import txtlogo from "../assets/logoFull-dark.svg";

const CheckAuthenticityLeft = () => {
  return (
    <div>

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
  )
}

export default CheckAuthenticityLeft;