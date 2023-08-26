import { FC } from "react";
import DropDown from "../assets/icons/drop-down.svg"

const CheckAuthenicityForm: FC = () => {
    return <form className="p-5 mt-[20px] mx-[90px]">
             

             <div className="mt-[80px] ml-[70px] w-[386px] h-[429px]">
              <div className="text-black text-4xl font-bold text-center w-[377px] h-[63px]">
              Check Authenticity
              </div>
              <div className="text-gray-700 text-base font-normal w-[386px] h-[34px] mt-[-25px] text-center" >
              Select manufacturer and product unique id to check the authenticity of your product.
              </div>

              <div className="mt-[69px]">
                 <div className="text-black text-base font-normal w-[249px] h-[32px]">Select Manufacturer</div>
                 <div className="w-[383px] h-11 px-3.5 py-2.5 rounded-lg shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
                  
                  <div className="w-[327px] h-6 text-gray-500 text-base font-normal leading-normal">
                      Select Manufacturer

                  </div>
                  {/* <select className="pt-2.5 pl-3.5" name="manufacturerList" id="manufacturerList" placeholder="Select Manufacurer" >

                      <option value="1"> puma</option>
                      <option value="4"> tuma</option>
                      <option value="3"> zuma</option>
                      <option value="2"> buma</option>



                  </select> */}

                  <span>
                          <img src={DropDown} alt="dropdown button" />
                  </span>
                  
                  
                  </div>
              </div>

              <div className="mt-[26px]">
                  <div className="text-black text-base font-normal" >

                  Enter Product ID
                  </div>

                  <div className=" w-[383.45px] h-[43.74px] bg-purple-500 bg-opacity-5 rounded-lg border border-gray-300">
                    
                  </div>
                   
              </div>

              <div className="mt-[58.26px] flex justify-end" >

                    <div className="w-[176px] h-[43px] bg-blue-900 rounded-[7px] flex items-center justify-center">

                        <div className="text-white text-base font-normal text-center"> 
                          Check 
                        </div>

                    </div>
                
              </div>
                
             </div>




    </form>;
};

export default CheckAuthenicityForm;
