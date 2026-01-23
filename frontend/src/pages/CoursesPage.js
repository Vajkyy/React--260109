import React, { useContext, useEffect } from "react";
import Course from "../components/Course";
import CourseSearch from "../components/CourseSearch";
import { CoursesContext } from "../contexts/CoursesContext";
import "./css/courses.css";

export default function CoursesPage() {
  const { getCourses, filteredList, loading, serverError } =
    useContext(CoursesContext);

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <CourseSearch />

      <div className="courses">
        {loading && <div>Betöltés folyamatban...</div>}

        {!loading && serverError && <div>{serverError}</div>}

        {!loading && !serverError && filteredList.length === 0 && (
          <div>Nincs találat.</div>
        )}

        {!loading &&
          filteredList.map((course) => (
            <Course course={course} key={course.id} />
          ))}
      </div>
    </>
  );
}
