import React from "react";

export const LoadingScreen = () => {
  return (
    <div className="lg:mx-16 md:mx-12 mx-8 my-8 fade-in" >
      <div className="flex justify-center h-screen">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-row w-full items-center gap-4">
            <div className="skeleton h-72 w-72 shrink-0 rounded-2xl"></div>
            <div className="flex flex-col gap-4 grow">
              <span className="loading loading-ring loading-lg"></span>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </div>
          <div className="skeleton h-96 w-full"></div>
        </div>
      </div>
    </div>
  );
};
