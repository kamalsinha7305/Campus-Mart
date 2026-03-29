import { Link, useLocation } from "react-router-dom";
import Image1 from "../assets/imageprofile.png";
import { useEffect, useState } from "react";


import { MdShoppingBag } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { MdChat } from "react-icons/md";
import whitebag from "../assets/bag.png";
import { useTheme } from "./ThemeContext";
import { IoIosArrowForward } from "react-icons/io";
import bag from "../assets/bluebag.png";
import bluebag from "../assets/bag.png";
import { RiNotification4Fill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { BsFillFileTextFill } from "react-icons/bs";

function Profile_left_part() {
  const { darkMode, toggleDarkMode } = useTheme();
  /* 
        const [activeItem, setActiveItem] = useState(null); */
  const menu = [
    { path: "/chat", label: "Chats", icon: MdChat, badge: 4 },
    {
      path: "/notification",
      label: "Notifications",
      icon: RiNotification4Fill,
      badge: 3,
    },
    { path: "/wishlist", label: "Wishlist", icon: FaHeart },
    { path: "/contact", label: "Contact Us", icon: MdMail },
    {
      path: "/termscondition",
      label: "Terms and Condition",
      icon: BsFillFileTextFill,
    },
  ];
  const { pathname } = useLocation();
  const itemClasses = (active) => `
    relative flex items-center px-[4vw] py-[1.2vh] md:px-[1.4vw] lg:px-[0.8vw] lg:py-[1.2vh] md:py-[1.2vh]  rounded-lg transition-all duration-150 cursor-pointer
    hover:bg-[#E9ECFF] dark:hover:bg-[#131313] font-nirmala xl:py-3
    ${
      active
        ? "bg-gradient-to-r from-[#394ff1] to-[#4d4ef2] text-white"
        : " text-[#292929]  dark:text-white"
    }
  `;
  const [userDetails, setUserDetails] = useState(null);



  return (
    <>
      <div className="bg-white dark:bg-[#1A1D20] md:rounded-2xl md:shadow-[2px_4px_12px_0px_rgba(0,0,0,0.10)] md:h-[82.5vh] xl:h-[86vh]">
        <div className=" px-[4.2vw] md:pl-[1.2vw] md:pr-[1.3vw] md:pt-[2.5vh] relative xl:px-6">
          <Link to="/profile">
            <div>
              <div className="relative ">
                <div className="bg-[#F6F7FF] dark:bg-[#282A2C] rounded-lg flex items-center p-5 md:p-4 pl-[3.5vw] md:pl-[1.8vw] lg:pl-[1.4vw] md:mx-0 mb-[2vh] md:mb-[2vh] transition-all duration-300 cursor-pointer hover:bg-[#e9ecff] xl:px-2 relative">
                  <div className="absolute right-3 top-8 text-[#4F4F4F]">
                    <IoIosArrowForward size={18} />
                  </div>
                  <img
                    className=" rounded-full w-[47px] h-[47px] lg:w-[55px] lg:h-[55px] md:mr-[1vw] mr-[2.5vw] "
                    src={Image1}
                  />
                  <div className="flex flex-col ">
                    <div className=" text-black dark:text-white  text-[13px] md:text-[14px] lg:text-[16px] font-normal font-['Poppins']">
                      {userDetails?.firstname || "User"}
                    </div>
                    <div className=" text-[#727272] dark:text-white  text-[13px] md:text-[14px] lg:text-[13px] xl:text-[13px] font-normal font-['Poppins']">
                      {userDetails?.firstname || "User@example.com"}
                    </div>
                    <div className=" text-[#979797] text-[10px] md:text-[9px] lg:text-[0.8rem] font-normal font-['Poppins']">
                      {" "}
                    </div>
                  </div>
                  {/*  <div data-svg-wrapper class="  hidden md:block absolute right-[1vw] top-[1vh] ">
                                            <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.92094 1.94591C4.22114 1.64571 4.70785 1.64571 5.00805 1.94591L11.1577 8.09553C11.4579 8.39572 11.4579 8.88244 11.1577 9.18263L5.00805 15.3322C4.70785 15.6324 4.22114 15.6324 3.92094 15.3322C3.62075 15.0321 3.62075 14.5453 3.92094 14.2451L9.527 8.63908L3.92094 3.03302C3.62075 2.73282 3.62075 2.24611 3.92094 1.94591Z" fill="#4F4F4F" />
                                            </svg>
                                        </div> */}
                </div>
              </div>
            </div>
          </Link>
          <div className="w-full h-[0px]  border border-[#E5E4FF]"></div>

          {/* Manage Orders */}
          <div className="  text-black dark:text-[#F2F3FF] md:text-[0.9rem] lg:text-[17px] font-medium font-poppins uppercase mt-[2vh] mb-[1vh] xl:text-[1vw]">
            Manage Orders
          </div>
          <Link to="/myorders" className="block pb-[0.2vh] xl:p-1">
            <div className={itemClasses(pathname === "/myorders")}>
              <div
                data-svg-wrapper
                className={
                  pathname === "/myorders"
                    ? "text-white"
                    : "text-black dark:text-white"
                }
              >
                <MdShoppingBag size={24} />
              </div>
              <span className="md:ml-[2vw] ml-[3vw] md:text-[0.93rem] lg:text-[17px] font-nirmala xl:text-[16px] xl:ml-5">
                Orders
              </span>
            </div>
          </Link>
          <Link
            to="/productlisted"
            className="block pb-[0.2vh] xl:px-[0.5vw] xl:py-1"
          >
            <div className={itemClasses(pathname === "/productlisted")}>
              <div
                data-svg-wrapper
                className={
                  pathname === "/productlisted"
                    ? "text-white"
                    : "text-black dark:text-white"
                }
              >
                <BsFillBoxSeamFill size={20} />
              </div>
              <span className="md:ml-[2vw] ml-[3vw]  md:text-[0.93rem] lg:text-[17px] font-normal font-nirmala xl:text-[16px] xl:ml-5">
                Product Listed
              </span>
            </div>
          </Link>
          <div className=" text-black dark:text-[#F2F3FF]   md:text-[0.9rem] lg:text-[17px] font-medium font-poppins uppercase mt-[2vh] mb-[1vh] xl:text-[1vw]">
            Activity
          </div>
          <nav className="w-full md:px-0">
            {menu.map(({ path, label, icon: Icon, badge }) => {
              const active = pathname === path;
              return (
                <Link key={path} to={path} className="block pb-[0.2vh] xl:px-1">
                  <div
                    className={`relative flex items-center px-[3vw] py-[1.2vh] md:px-[1.4vw] lg:px-[0.8vw] md:py-[1.2vh] rounded-lg transition-all duration-150 cursor-pointer hover:bg-[#e9ecff] dark:hover:bg-[#131313] xl:py-3 ${
                      active
                        ? "bg-gradient-to-r from-[#394ff1] to-[#4d4ef2] text-white"
                        : " text-[#292929]  dark:text-white"
                    }`}
                  >
                    <div
                      data-svg-wrapper
                      className={
                        active ? "text-white" : "text-black dark:text-white"
                      }
                    >
                      <Icon size={22} />
                    </div>
                    <span className="md:ml-[2vw] ml-[3vw] md:text-[0.93rem] lg:text-[17px] font-nirmala xl:text-[16px] xl:ml-5">
                      {label}
                    </span>
                    {badge !== undefined && (
                      <span
                        className={`absolute right-[1vw] top-[1.3vh] flex h-[22px] w-[22px] items-center justify-center rounded-full text-[13px] font-robotoFlex ${
                          active
                            ? "bg-white text-black dark:text-black"
                            : "bg-[#F20000] text-white"
                        }`}
                      >
                        {badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-[-9vh] left-[20vw] lg:bottom-[-8.5vh] lg:left-[6vw] md:bottom-[-8vh] md:left-[5.5vw] xl:left-[5.5vw]">
            <div className="flex items-end">
              <div
                data-svg-wrapper
                className="mr-[0.5vw] lg:mr-[0.4vw] mb-[1vh]"
              >
                <img
                  src={bluebag}
                  alt="bag"
                  className="size-3 lg:size-5 block dark:hidden"
                />

                <img
                  src={whitebag}
                  alt="bag"
                  className="size-3 lg:size-5 hidden dark:block"
                />
              </div>
              <span className="text-[#012436] dark:text-[#F2F3FF] md:text-[16px] lg:text-[20px] font-poppins font-semibold mr-[5px]">
                Campus
              </span>{" "}
              <span className=" text-[#394FF1] dark:text-[#FFFFFF]  md:text-[16px] lg:text-[22px] font-poppins font-semibold">
                Mart
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile_left_part;
