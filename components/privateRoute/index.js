import React, { useEffect } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { isLoggedInUser } from "../../redux/actions";

export function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  if (typeof window === "undefined") {
    return (
      <>
        <p>Loading...</p>
      </>
    );
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
      if (!uid.length > 0) {
        dispatch(isLoggedInUser());
      }
    }, []);

    return <>{children}</>;
  }
}
