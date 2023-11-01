import React from "react";
import { ImStatsDots } from "react-icons/im";

const Navigation = () => {
  return (
    <header className="container max-w-2xl px-6 py-5 mx-auto">
      <div className="flex items-center justify-between">
        {/* user information */}
        <div className="flex text-center items-center gap-2">
          {/* image */}
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/men/64.jpg"
              alt="profileImage"
              className="object-cover h-full w-full"
            />
          </div>

          {/* name */}
          <small className="text-[15px]">Hello, Mr. John Wick</small>
        </div>

        {/* right side of nav */}
        <nav className="flex text-center items-center gap-5 ">
          <div className="cursor-pointer ">
            {/* stats icon */}
            <ImStatsDots className="text-xl" />
          </div>
          <div>
            {/* logout button */}
            <div className="btn btn-danger hover:scale-110 transition-transform duration-400">
              <button>Signout</button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
