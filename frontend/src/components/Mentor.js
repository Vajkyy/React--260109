import React, { useContext } from "react";
import "../pages/css/mentor.css";
import { MentorContext } from "../contexts/MentorContext";
import { useNavigate } from "react-router";

export default function Mentor({ mentor }) {
  const { bookedSession } = useContext(MentorContext);
  const navigate = useNavigate();

  const handleSessionBooking = async () => {
    if (!mentor || !mentor.id) return;

    try {
      const resp = await bookedSession(mentor.id);
      console.log("Booked session response:", resp.data);
      navigate("/bookedsession");
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      if (error.response?.status === 403) {
        alert("Insufficient credits to book this session");
      } else {
        alert("Booking failed. Please try again.");
      }
    }
  };

  if (!mentor) {
    return (
      <div className="sessions keret padding">
        <h3>A tartalom betöltés alatt ...</h3>
      </div>
    );
  }

  const formattedDate = new Date(mentor.sessionDate).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  const formattedTime = new Date(mentor.sessionDate).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    },
  );

  return (
    <div className="sessions keret padding">
      <h3>{mentor.mentorName}</h3>
      <p>
        <strong>Expertise:</strong> {mentor.expertise}
      </p>
      <p>
        {mentor.experienceLevel} Developer with{" "}
        {mentor.yearsExperience || "N/A"} years experience
      </p>

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
          <p>{mentor.durationMinutes} minutes</p>
        </div>
        <div className="keret">
          <p>Cost</p>
          <p>{mentor.creditCost} credits</p>
        </div>
      </div>

      <div className="button">
        <button className="keret profile inactive">View profile</button>
      </div>

      <div className="button">
        <button
          className={`keret session ${mentor.isAvailable ? "available-button" : "inactive"}`}
          onClick={handleSessionBooking}
          disabled={!mentor.isAvailable}
        >
          {mentor.isAvailable ? "Available" : "Not available"}
        </button>
      </div>
    </div>
  );
}
