import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { setGuard } from "../state/guards";
import { getData } from "../utils/asyncStorage";
import ForgotPassword from "./ForgotPassword";
import { NativeRouter,Routes,Route} from "react-router-native";
import Loading from "./Loading";
import ConfirmCode from "./ConfirmCode";
import NewPassword from "./NewPassword"

const Options = () => {


  const [notShow, setNotShow] = useState(true);
  const dispatch = useDispatch();
  const guard = useSelector(state=>state.guard);
  console.log(guard,"esto sale del store")

  useEffect(() => {
    getData("guard").then((data) => {
      if(data.id) dispatch(setGuard(data))
    }).catch(e=>console.log(e));
    setTimeout(() => {
      setNotShow(false);
    }, 3000);
  }, []);

  if (notShow) {
    return (
      <Loading />
    );
  } else if (guard.id) {
    return (
     <Home />
      );
  } else {
    return (
      <NativeRouter>
      <Routes>
          <Route path="/" element = {<Login />} />
          <Route path="/recover" element = {<ForgotPassword />} />
          <Route path="/code" element = {<ConfirmCode />} />
          <Route path="/confirm" element = {<NewPassword />} />


      </Routes>
      </NativeRouter>
    );
  }
};

export default Options;
