import React, { useContext } from "react";
import { ImStatsDots } from "react-icons/im";
import { authContext } from "@/lib/store/auth-context";

const Navigation = () => {
  // destructuring the auth context parameters
  const { user, loading, logout } = useContext(authContext);

  return (
    <header className="container max-w-2xl px-6 py-5 mx-auto">
      <div className="flex items-center justify-between">
        {/* user information */}
        {user && !loading && (
          <div className="flex text-center items-center gap-2">
            {/* image */}
            <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
              <img
                className="object-cover h-full w-full"
                src={user.photoURL}
                alt={user.displayName}
                referencepolicy='no-reference'
              />
            </div>

            {/* name */}
            <small className="text-[15px]">Hello, Mr. {user.displayName}</small>
          </div>
        )}

        {/* right side of nav */}
        {user && !loading && (
          <nav className="flex text-center items-center gap-10 ">
            <div className="cursor-pointer ">
              {/* stats icon */}
              <ImStatsDots className="text-xl hover:text-3xl hover:text-green-500 transform-all duration-300" />
            </div>
            <div>
              {/* logout button */}
              <div className="btn btn-danger hover:scale-110 transition-transform duration-400">
                <button onClick={() => logout()}>Signout</button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;
