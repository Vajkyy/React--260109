import React, { useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { CoursesContext } from "../contexts/CoursesContext";
import "./css/courses.css";

export default function CourseDetailsPage() {
  const { selectedCourse, getCourseById, loading, completeChapter } =
    useContext(CoursesContext);
  const { loadUser } = useContext(AuthContext);

  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;

  useEffect(() => {
    if (course?.id) {
      getCourseById(course.id);
    }
  }, [course]);

  useEffect(() => {
    if (window.LinkedInShare) {
      window.LinkedInShare.init({
        container: "#linkedin-share-root",
        theme: "light",
        locale: "en-US",
      });
    }
  }, []);

  const progress = useMemo(() => {
    if (!selectedCourse?.course) return null;

    const chapters = selectedCourse.course.chapters;
    const completed = chapters.filter((c) => c.isCompleted);

    return {
      totalChapters: chapters.length,
      completedChapters: completed.length,
      totalCredits: chapters.reduce((s, c) => s + c.credits, 0),
      completedCredits: completed.reduce((s, c) => s + c.credits, 0),
    };
  }, [selectedCourse]);

  if (loading || !selectedCourse || !progress) {
    return <div>Az oldal betöltés alatt...</div>;
  }

  function markAsCompleted(chapter) {
    if (chapter.isCompleted) return;

    completeChapter(selectedCourse.course.id, chapter.id).then(() => {
      loadUser();
      getCourseById(selectedCourse.course.id);
    });
  }

  function share(chapter) {
    if (window.LinkedInShare?.open) {
      window.LinkedInShare.open({
        url: window.location.href,
        title: `Course: ${chapter.courseTitle}`,
        summary: `I just completed "${chapter.title}"!`,
        source: "SkillShare Academy",
      });
    }
  }

  return (
    <div className="padding courseone">
      <div className="keret">
        <button className="keret padding" onClick={() => navigate(-1)}>
          Back to course
        </button>

        <h1>{selectedCourse.course.title}</h1>
        <p>{selectedCourse.course.description}</p>
        <p>{selectedCourse.course.difficulty}</p>

        <div className="progress">
          <div className="chapter-progress keret">
            <h3>Chapter progress</h3>
            <div className="progress-container">
              <div
                className="progressbar"
                style={{
                  width: `${
                    (progress.completedChapters / progress.totalChapters) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="credit-progress keret">
            <h3>Credit progress</h3>
            <div className="progress-container">
              <div
                className="progressbar"
                style={{
                  width: `${
                    (progress.completedCredits / progress.totalCredits) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedCourse.course.chapters.map((ch) => (
        <div className="keret" key={ch.id}>
          <h2>Chapter: {ch.title}</h2>
          <p>{ch.description}</p>
          <div className="keret padding">{ch.credits} credits</div>

          <button
            className="keret"
            onClick={() => markAsCompleted(ch)}
            disabled={ch.isCompleted}
          >
            {ch.isCompleted ? "Chapter completed" : "Mark as Completed"}
          </button>

          {ch.isCompleted && (
            <button className="keret linkedin" onClick={() => share(ch)}>
              Share on LinkedIn
            </button>
          )}
        </div>
      ))}

      <div id="linkedin-share-root" />
    </div>
  );
}
