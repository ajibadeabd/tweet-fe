import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Sign from "./component/signUp";
import Tweet from "./component/Tweet";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Sign />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/tweet" element={<Tweet />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
