import { FC } from "react";
import Back from "../assets/icons/Back-btn.svg";

const CheckAuthenticity: FC = (): JSX.Element => {
  return (
    <div className="flex flex-grow">
      <div className="w-full h-ful">
        <div className=" w- 700 ">
          <div>
            <img src={Back} alt="Back button" />
          </div>
          check authenticity page
          <div className="mt-129 ml-234">
            <div>logo authentiscan</div>

            <div>
              AuthentiScan Let you easily verify your products using blockchain
              technology. It’s easy as 1 2 3: Select manufacturer Enter Product
              unique id Hit check button and we will search the whole universe
              for your product authenticity.
            </div>
          </div>
        </div>

        <div className="w-721 h-621"></div>

        {/* Here you go :> */}
        {/* Use prebuilt componentes wherever you can such as Button and Input */}
      </div>
    </div>
  );
};

export default CheckAuthenticity;
