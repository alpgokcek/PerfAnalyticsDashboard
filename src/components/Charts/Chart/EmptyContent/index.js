import React from "react";

import "./empty-content.scss";

export default function EmptyContent() {
  return (
    <div className="empty-content">
      <div className="empty-content__wrapper">
        <img
          className="empty-content__wrapper-icon"
          src="assets/img/no-data.png"
          alt="no-data"
        />
        <div>Not content found.</div>
      </div>
    </div>
  );
}
