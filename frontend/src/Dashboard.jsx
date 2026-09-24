import { useEffect, useState } from "react";
import { API } from "./config";

export default function Dashboard({ user }) {
  const [total, setTotal] = useState(0);
  const [due, setDue] = useState(0);

  useEffect(() => {
    fetch(`${API}/api/cards?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setTotal(data.length));

    fetch(`${API}/api/cards/due?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setDue(data.length));
  }, [user.id]);

  return (
    <>
      <h4>Hi {user.name}</h4>
      <div className="row mt-3">
        <div className="col-6">
          <div className="card p-3 text-center"><h2>{total}</h2>Total cards</div>
        </div>
        <div className="col-6">
          <div className="card p-3 text-center"><h2>{due}</h2>Due today</div>
        </div>
      </div>
    </>
  );
}