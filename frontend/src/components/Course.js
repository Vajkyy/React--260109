import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { CoursesContext } from "../contexts/CoursesContext";

export default function Course({
  course = {
    title: "Teszt",
    description: "Leírás",
    difficulty: "easy",
    totalChapters: 0,
    totalCredits: 0,
    isEnrolled: false,
  },
}) {
  const navigate = useNavigate();
  const { enrollCourse } = useContext(CoursesContext);

  const handleEnroll = () => {
    if (!course.isEnrolled) enrollCourse(course.id);
    navigate(`/courses/${course.id}`, { state: { course } });
  };

  const buttonStyle = {
    background: course.isEnrolled ? "#90ee90" : "#f5f5dc",
    cursor: "pointer",
  };

  return (
    <div className="course keret">
      <div className="header">
        <h2 className="nagy">{course.title}</h2>
        <p className="beiratkozva">{course.isEnrolled ? "✔" : "📝"}</p>
      </div>

      <p>{course.description}</p>

      <div className="course-details">
        <div className="keret nagy kozep">{course.difficulty}</div>
        <div className="keret nagy kozep">
          Chapter <br />
          {course.totalChapters}
        </div>
        <div className="keret nagy kozep">
          Total Credit <br />
          {course.totalCredits}
        </div>
      </div>

      <button className="nagy" style={buttonStyle} onClick={handleEnroll}>
        {course.isEnrolled ? "Continue Learning" : "Enroll"}
      </button>
    </div>
  );
}
