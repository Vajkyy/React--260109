import React, { useContext, useEffect, useState } from "react";
import { CoursesContext } from "../contexts/CoursesContext";

export default function CourseSearch() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const { szuro } = useContext(CoursesContext);

  useEffect(() => {
    szuro(difficulty, search);
  }, [difficulty, search, szuro]);

  return (
    <div className="p-3 keret">
      <h1 className="nagy">Course Catalog</h1>
      <p>Discover and enroll in courses to advance your skills</p>

      <div className="szuro">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses by title or description..."
        />

        <select
          className="nagy"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          name="difficulty"
          id="difficulty"
        >
          <option value="all">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
}
