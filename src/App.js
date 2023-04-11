import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Home from "./pages/feeds/Home";
import SignUpFormUser from "./pages/signup/SignUpFormUser";
import EmailVerify from "./pages/signup/EmailVerify";
import SignUpFormUserProfile from "./pages/signup/SignUpFormUserProfile";
import SignUpCompany from "./pages/signup/SignUpCompany";
import SignUpAcademics from "./pages/signup/SignUpAcademics";
import RequestEmailReset from "./pages/forgot password/RequestEmailReset";
import PasswordReset from "./pages/forgot password/PasswordReset";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/signup/" >
          <Route exact path="user" element={<SignUpFormUser />} />
          <Route exact path="email-verify/:token" element={<EmailVerify />} />
          <Route exact path="user-profile" element={<SignUpFormUserProfile />} />
          <Route exact path="user-academics" element={<SignUpAcademics />} />
          <Route exact path="user-company" element={<SignUpCompany />} />
        </Route>
        <Route path="/user/">
          <Route exact path="request-reset-email" element={<RequestEmailReset />} />
          <Route exact path="password-reset/:uidb64/:token" element={<PasswordReset />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
