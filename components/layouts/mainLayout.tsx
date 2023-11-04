import React from "react";
import Sidebar from "./sidebar";
import Heading from "./heading";

const mainLayout = <T extends Object>(
  WrapperComponent: React.ComponentType<T>
) => {
  const Wrapper = (props: T) => {
    return (
      <main className="w-full min-h-screen flex fixed">
        <div className="w-56 bg-primary">
          <Sidebar />
        </div>
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto">
            <Heading />
            <WrapperComponent {...props} />
          </div>
        </div>
      </main>
    );
  };

  return Wrapper;
};

export default mainLayout;
