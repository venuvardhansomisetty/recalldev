import { useEffect, useState } from "react";
import { API } from "./config";

export default function AllCards({ user }) {
  const [cards, setCards] = useState([]);

  const loadCards = () => {
    fetch(`${API}/api/cards?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setCards(data));
  };

  useEffect(() => {
    loadCards();
  }, []);

  const deleteCard = async (id) => {
    await fetch(`${API}/api/cards/${id}`, { method: "DELETE" });
    loadCards(); // refresh the list
  };

  return (
    <>
      {cards.length === 0 && <p>No cards yet. Add your first one!</p>}
      {cards.map((c) => (
        <div key={c.id} className="card p-3 mb-2 d-flex flex-row justify-content-between">
          <div>
            <b>{c.question}</b>
            <br />
            <small>{c.tag} | next review: {c.nextReviewDate}</small>
          </div>
          <button className="btn btn-sm btn-outline-danger" onClick={() => deleteCard(c.id)}>

            Delete
          </button>
        </div>
      ))}
    </>
  );
}