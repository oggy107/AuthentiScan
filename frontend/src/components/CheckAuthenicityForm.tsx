import { FC } from "react";

const CheckAuthenicityForm: FC = () => {
    return <form className="p-5 mt-[20px] mx-[90px]">
             

             <div className="mt-[80px] ml-[70px] w-[386px] h-[429px]">
              <div className="text-black text-4xl font-bold text-center w-[377px] h-[63px]">
              Check Authenticity
              </div>
              <div className="text-gray-700 text-base font-normal w-[386px] h-[34px] mt-[-25px] text-center" >
              Select manufacturer and product unique id to check the authenticity of your product.
              </div>

             </div>




    </form>;
};

export default CheckAuthenicityForm;
