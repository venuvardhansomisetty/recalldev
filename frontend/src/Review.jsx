import { useEffect, useState } from "react";
import { API } from "./config";

export default function Review({ user }) {
  const [queue, setQueue] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/cards/due?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setQueue(data);
        setLoaded(true);
      });
  }, [user.id]);

  const rate = async (rating) => {
    await fetch(`${API}/api/cards/${queue[0].id}/review?rating=${rating}`, { method: "PUT" });
    setQueue(queue.slice(1)); // remove the first card from the list
    setShowAnswer(false);
  };

  if (!loaded) return <p>Loading...</p>;
  if (queue.length === 0) return <h5>You are done for today 🎉</h5>;

  const card = queue[0];

  return (
    <div className="card p-4">
      <small className="text-muted">{card.tag} | {queue.length} cards left</small>
      <h5 className="my-3">{card.question}</h5>


      {showAnswer ? (
        <>
          <p style={{ whiteSpace: "pre-wrap" }}>{card.answer}</p>
          <div className="d-flex gap-2">
            <button className="btn btn-danger" onClick={() => rate(1)}>Again</button>
            <button className="btn btn-warning" onClick={() => rate(3)}>Hard</button>
            <button className="btn btn-primary" onClick={() => rate(4)}>Good</button>
            <button className="btn btn-success" onClick={() => rate(5)}>Easy</button>
          </div>
        </>
      ) : (
        <button className="btn btn-secondary" onClick={() => setShowAnswer(true)}>
          Show answer
        </button>
      )}
    </div>
  );
}