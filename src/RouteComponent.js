import React from "react";
import { Routes, Route } from "react-router-dom";
import ListPage from "./layout/listPage/ListPage";
import DetailsPage from "./layout/detailsPage/DetailsPage";

export default function RouteComponent() {
  return (
    <>
      <div className="route_container">
        <div className="home_layoutContainer">
          {/* <LoaderComponent /> */}

          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/details" element={<DetailsPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
