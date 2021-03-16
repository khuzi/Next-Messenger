import React from "react";

import styles from "./messageBox.module.css";

export function MessageBox({ right }) {
  return (
    <div className={right ? styles.warpper_right : styles.warpper_left}>
      <div className={right ? styles.message_right : styles.message_left}>
        Hello
      </div>
    </div>
  );
}
