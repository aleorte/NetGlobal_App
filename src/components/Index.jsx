import AppLoader from "./AppLoader";
import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { setGuard } from "../state/guards";
import { getData } from "../utils/asyncStorage";
import ForgotPassword from "./ForgotPassword";
import { NativeRouter, Routes, Route } from "react-router-native";
import ConfirmCode from "./ConfirmCode";
import NewPassword from "./NewPassword";

export default function AppHome() {
  const dispatch = useDispatch();
  const guard = useSelector((state) => state.guard);
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    getData("guard")
      .then((data) => {
        if (data.id) dispatch(setGuard(data));
      })
      .catch((e) => console.log(e));
    setTimeout(() => {
      setLoaderVisible(false);
    }, 3000);
  }, []);

  return (
    <>
      {guard.id ? (
        <>
          <Home />
          {loaderVisible ? <AppLoader /> : null}
        </>
      ) : (
        <>
          <NativeRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/recover" element={<ForgotPassword />} />
              <Route path="/code/:email" element={<ConfirmCode />} />
              <Route path="/confirm/:email" element={<NewPassword />} />
            </Routes>
          </NativeRouter>
          {loaderVisible ? <AppLoader /> : null}
        </>
      )}
    </>
  );
}
