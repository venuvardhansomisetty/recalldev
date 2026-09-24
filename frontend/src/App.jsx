import { useState } from "react";
import Dashboard from "./Dashboard";
import Review from "./Review";
import AddCard from "./AddCard";
import AllCards from "./AllCards";

export default function App() {
  const user = { id: 1, name: "Me" }; // fixed user for now, login comes in Stage 2
  const [page, setPage] = useState("dashboard");

  const menu = [
    ["dashboard", "Dashboard"],
    ["review", "Review"],
    ["add", "Add Card"],
    ["all", "All Cards"],
  ];

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-3 gap-2">
        <span className="navbar-brand">RecallDev</span>
        {menu.map(([key, label]) => (
          <button
            key={key}
            className={"btn btn-sm " + (page === key ? "btn-light" : "btn-outline-light")}
            onClick={() => setPage(key)}
          >
            {label}
          </button>
        ))}
      </nav>


      <div className="container py-4">
        {page === "dashboard" && <Dashboard user={user} />}
        {page === "review" && <Review user={user} />}
        {page === "add" && <AddCard user={user} />}
        {page === "all" && <AllCards user={user} />}
      </div>
    </>
  );
}