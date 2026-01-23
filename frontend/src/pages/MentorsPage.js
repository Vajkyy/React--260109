import React, { useContext, useEffect } from "react";
import Mentor from "../components/Mentor";
import { MentorContext } from "../contexts/MentorContext";
import { AuthContext } from "../contexts/AuthContext";

export default function MentorsPage() {
  const {
    mentorList,
    getMentor,
    loading: mentorLoading,
  } = useContext(MentorContext);
  const { user, loadUser, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    getMentor();
    loadUser();
  }, []);

  if (mentorLoading || authLoading) {
    return (
      <>
        <div className="keret padding">
          <h1>Mentor Session Booking</h1>
          <p>Book one-on-one session...</p>
          <div className="keret padding" style={{ background: "lightblue" }}>
            <strong>Az oldal betöltés alatt!</strong>
          </div>
        </div>
        <div className="sessions keret padding">Az oldal betöltés alatt!</div>
      </>
    );
  }

  return (
    <>
      <div className="keret padding">
        <h1>Mentor Session Booking</h1>
        <p>Book one-on-one session...</p>

        <div className="keret padding" style={{ background: "lightblue" }}>
          <strong>
            Your Current Balance: {user?.user?.creditBalance ?? 0} Credits
          </strong>
          <br />
          <span>
            Sessions are automatically checked for confirmation every 30 seconds
          </span>
        </div>
      </div>

      <div className="sessions keret padding">
        <h2>Available Sessions</h2>

        {mentorList.length > 0 ? (
          mentorList.map((mentor) => <Mentor mentor={mentor} key={mentor.id} />)
        ) : (
          <p>Nincs elérhető mentor session.</p>
        )}
      </div>
    </>
  );
}
