import React from "react";
import "../pages/css/mentor.css";

export default function BookedSession({ session }) {
  const { session: s, status } = session;

  const statusClass =
    status === "rejected"
      ? "rejected-button"
      : status === "pending"
        ? "pending-button"
        : status === "cancelled"
          ? "canceled-button"
          : "confirmed-button";

  const formattedDate = new Date(s.sessionDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = new Date(s.sessionDate).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="sessions keret padding">
      <h3>{s.mentorName}</h3>

      <div className="button">
        <button className={statusClass}>{status}</button>
      </div>

      <div className="mentor-container">
        <div className="keret">
          <p>Date</p>
          <p>{formattedDate}</p>
        </div>

        <div className="keret">
          <p>Time</p>
          <p>{formattedTime}</p>
        </div>

        <div className="keret">
          <p>Duration</p>
          <p>{s.durationMinutes} minutes</p>
        </div>

        <div className="keret">
          <p>Cost</p>
          <p>{s.creditCost} credits</p>
        </div>
      </div>
    </div>
  );
}
