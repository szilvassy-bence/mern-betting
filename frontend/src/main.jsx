import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Frame from "./components/Frame";
import Leagues from "./components/Leagues";
import League from "./components/League";
import Register from "./components/Register";
import Blackjack from "./components/Blackjack";
import Home from "./components/Home"
import UserAccount from "./components/UserAccount"

import { SearchContextComponent } from "./contexts/SearchContext";



ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchContextComponent />}>
          <Route path="/" element={<Frame />}>
            <Route index element={<Home />} />

            <Route path="/leagues" >
              {/* Render the Leagues component when the URL is "/leagues" */}
              <Route index element={<Leagues />} />
              {/* Render the League component when the URL includes an ":id" parameter */}
              <Route path=":id" element={<League />} />
            </Route>
            <Route path="/casino">
              <Route path="blackjack" element={<Blackjack />} />
            </Route>
            <Route path="/user">
              <Route path="register" element={<Register />} />
              <Route path=":id" element={<Register />} />
            </Route>
            <Route path="/account" element={<UserAccount />}/> 
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  //</React.StrictMode>
);
