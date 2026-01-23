import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import BookedSession from "../components/BookedSession";
import { AuthContext } from "../contexts/AuthContext";
import { usePolling } from "../hooks/usePolling";

export default function BookedSessionPage() {
  const navigate = useNavigate();
  const { loadUser, user, loading } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, []);

  usePolling(() => {
    if (user) {
      loadUser();
    }
  }, 30000);

  if (loading) {
    return <div>Betöltés folyamatban...</div>;
  }

  if (!user?.sessions || user.sessions.length === 0) {
    return <div>Nincs felvett mentor session.</div>;
  }

  return (
    <div>
      <button className="keret padding" onClick={() => navigate(-1)}>
        Back to Mentors
      </button>

      {user.sessions.map((session) => (
        <BookedSession key={session.id} session={session} mentor={{}} />
      ))}
    </div>
  );
}
