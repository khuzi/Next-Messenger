import React from "react";

import styles from "./messageBox.module.css";

export function MessageBox({ left, msg }) {
  return (
    <div className={left ? styles.warpper_left : styles.warpper_right}>
      <div className={left ? styles.message_left : styles.message_right}>
        {msg}
      </div>
    </div>
  );
}
