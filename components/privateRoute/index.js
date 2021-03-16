import React, { useEffect } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";

import { isLoggedInUser } from "../../redux/actions";

export function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  if (typeof window === "undefined") {
    return <p>Loading...</p>;
  }
  const isUser =
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  if (!isUser) {
    Router.push("/login");
    return null;
  } else {
    useEffect(() => {
      dispatch(isLoggedInUser());
    }, []);

    return <>{children}</>;
  }
}
