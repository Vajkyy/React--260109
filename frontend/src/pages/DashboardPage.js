import React, { useContext, useEffect } from "react";
import "../css/dashboard.css";
import { AuthContext } from "../contexts/AuthContext";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardPage() {
  const { user, loadUser, serverError } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, []);

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="keret">
          <h1>Felhasználó lekérése folyamatban ...</h1>
          <p>{serverError || "Az oldal betöltés alatt ..."}</p>
        </div>
      </div>
    );
  }

  const userStats = user?.stats || {};
  const userName = user?.user?.name || "Guest";
  const creditBalance = user?.user?.creditBalance || 0;

  // ===== LINE CHART DATA =====
  const labels = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split("T")[0];
  });

  const creditsByDate = {};
  user?.recentActivity?.forEach((item) => {
    const date = item.timestamp.split("T")[0];
    creditsByDate[date] = (creditsByDate[date] || 0) + item.creditsEarned;
  });

  const lineData = {
    labels,
    datasets: [
      {
        label: "Credits",
        data: labels.map((date) => creditsByDate[date] || 0),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "CREDIT PROGRESS (LAST 30 DAYS)" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Credits" } },
      x: { title: { display: false } },
    },
  };

  // ===== DOUGHNUT CHART DATA =====
  const doughnutData = {
    labels: ["Completed Chapters", "Remaining Chapters"],
    datasets: [
      {
        data: [
          userStats.completedChapters || 0,
          (userStats.enrolledCourses || 0) - (userStats.completedChapters || 0),
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(200, 200, 200, 0.3)",
        ],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(200, 200, 200, 0.5)"],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "rgba(236, 238, 255, 0.78)" },
      },
      title: {
        display: true,
        text: "COURSE COMPLETION STATUS",
        color: "#eef0ff",
      },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="keret">
        <h1>WELCOME BACK, {userName.toUpperCase()}!</h1>
        <h2 className="alahuzas">
          CURRENT BALANCE: <strong>{creditBalance}</strong> CREDITS
        </h2>

        {/* METRICS */}
        <div className="dobozok">
          <div className="keret metric">
            <h3>{userStats.enrolledCourses || 0}</h3>
            <p>ENROLLED COURSES</p>
          </div>
          <div className="keret metric">
            <h3>{userStats.completedChapters || 0}</h3>
            <p>COMPLETED CHAPTERS</p>
          </div>
          <div className="keret metric">
            <h3>{userStats.totalCreditsEarned || 0}</h3>
            <p>TOTAL CREDITS EARNED</p>
          </div>
        </div>

        {/* CHARTS */}
        <div className="diagram">
          <div className="line keret">
            <Line data={lineData} options={lineOptions} />
          </div>
          <div className="pie keret">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="actions">
          <button>BROWSE COURSES</button>
          <button>BOOK MENTOR SESSION</button>
        </div>
      </div>
    </div>
  );
}
