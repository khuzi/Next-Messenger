import React from "react";

import styles from "./messageBox.module.css";

export function MessageBox({ right }) {
  return (
    <>
      <div className={right ? styles.message_right : styles.message_left}>
        Hello
        <div
          className={right ? styles.corner_right : styles.corner_right}
        ></div>
      </div>
    </>
  );
}
