import { myAxios, getAuthHeaders } from "../services/api";
import { createContext, useState } from "react";

export const CoursesContext = createContext();

export function CoursesProvider({ children }) {
  const [coursesList, setCoursesList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  function getCourses() {
    setLoading(true);
    setServerError(null);

    myAxios
      .get("/courses", { headers: getAuthHeaders() })
      .then((response) => {
        const courses = response.data.courses || [];
        setCoursesList(courses);
        setFilteredList(courses);
      })
      .catch(() => {
        setServerError("Nem sikerült betölteni a kurzusokat.");
      })
      .finally(() => setLoading(false));
  }

  function getCourseById(id) {
    setLoading(true);
    setServerError(null);

    myAxios
      .get(`/courses/${id}`, { headers: getAuthHeaders() })
      .then((response) => {
        setSelectedCourse(response.data);
      })
      .catch(() => {
        setServerError("Nem sikerült betölteni a kurzust.");
      })
      .finally(() => setLoading(false));
  }

  function szuro(difficulty, search) {
    const result = coursesList.filter((c) => {
      const difficultyOk = difficulty === "all" || c.difficulty === difficulty;

      const searchOk =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());

      return difficultyOk && searchOk;
    });

    setFilteredList(result);
  }

  function enrollCourse(courseId) {
    setLoading(true);
    setServerError(null);

    return myAxios
      .post(
        `/courses/${courseId}/enroll`,
        { isEnrolled: true },
        { headers: getAuthHeaders() },
      )
      .finally(() => setLoading(false));
  }

  function completeChapter(courseId, chapterId) {
    setLoading(true);
    setServerError(null);

    return myAxios
      .post(
        `/courses/${courseId}/chapters/${chapterId}/complete`,
        { completed: true },
        { headers: getAuthHeaders() },
      )
      .finally(() => setLoading(false));
  }

  return (
    <CoursesContext.Provider
      value={{
        getCourses,
        filteredList,
        selectedCourse,
        loading,
        serverError,
        szuro,
        enrollCourse,
        completeChapter,
        getCourseById,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}
