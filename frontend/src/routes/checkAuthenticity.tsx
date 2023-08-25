import { FC } from "react";
import CheckAuthenticityLeft from "../components/CheckAuthenticityLeft";


const CheckAuthenticity: FC = (): JSX.Element => {
  return (
    <div className="flex flex-grow">
      <div className="w-full h-ful grid grid-cols-2 ">
        <div>
        <CheckAuthenticityLeft/>
        </div>
        <div>
         
        <CheckAuthenticityLeft/>

        </div>
      </div>
    </div>
  );
};

export default CheckAuthenticity;
