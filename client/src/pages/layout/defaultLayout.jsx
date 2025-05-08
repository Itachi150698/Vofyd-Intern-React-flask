import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Sidebar from "./sidebar/sidebar";

const DefaultLayout = () => {
  return (
    <>
      <div className="px-3 pb-3">
        <Header />
        <main className="mt-3">
          <Sidebar />
          <div className="ml-180 ps-3">
          <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default DefaultLayout;
