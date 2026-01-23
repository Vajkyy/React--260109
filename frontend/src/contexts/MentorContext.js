import { myAxios, getAuthHeaders } from "../services/api";
import { createContext, useState } from "react";

export const MentorContext = createContext();

export function MentorProvider({ children }) {
  const [mentorList, setMentorList] = useState([]);
  const [loading, setLoading] = useState(false);

  function getMentor() {
    setLoading(true);

    myAxios
      .get("/mentors/sessions", { headers: getAuthHeaders() })
      .then((response) => {
        setMentorList(response.data.sessions || []);
      })
      .catch((error) => {
        console.error(error);
        setMentorList([]);
      })
      .finally(() => setLoading(false));
  }

  function bookedSession(mentorId) {
    setLoading(true);

    return myAxios
      .post(
        `/mentors/sessions/${mentorId}/book`,
        { mentorId }, // most már a body tartalmazza a szükséges adatot
        { headers: getAuthHeaders() },
      )
      .finally(() => setLoading(false));
  }

  return (
    <MentorContext.Provider
      value={{
        mentorList,
        loading,
        getMentor,
        bookedSession,
      }}
    >
      {children}
    </MentorContext.Provider>
  );
}
