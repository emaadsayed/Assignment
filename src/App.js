import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import ContactPage from "./components/contactPage";
import ChartAndMap from "./components/chartAndMap";
import useMedia from "use-media";

function App() {
  const isMobile = useMedia({ maxWidth: 912 });
  return (
    <div className={!isMobile ? "flex" : ""}>
      <Sidebar isMobile={isMobile} />
      <Routes>
        <Route path="/" element={<ContactPage isMobile={isMobile} />} />
        <Route path="/chartmap" element={<ChartAndMap />} />
      </Routes>
    </div>
  );
}

export default App;