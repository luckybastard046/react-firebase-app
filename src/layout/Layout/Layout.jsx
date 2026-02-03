import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

function Layout({ children }) {

  return (
    <div>
      <Header />
        <main style={{ minHeight: "86vh", marginTop: '15px' }}>
          {children}
          <Outlet />
        </main>
      <Footer />
    </div>
  );
};

export default Layout;