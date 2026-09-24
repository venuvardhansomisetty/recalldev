import { useState } from "react";
import { API } from "./config";

export default function AddCard({ user }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [tag, setTag] = useState("Java");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the page from reloading
    await fetch(`${API}/api/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, question, answer, tag }),
    });
    setQuestion("");
    setAnswer("");
    setMessage("Card added!");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <input
        className="form-control mb-2"
        placeholder="Question (e.g. What is the difference between == and equals()?)"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <textarea
        className="form-control mb-2"

        rows={4}
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <select className="form-select mb-2" value={tag} onChange={(e) => setTag(e.target.value)}>
        <option>Java</option>
        <option>Spring Boot</option>
        <option>React</option>
        <option>JavaScript</option>
        <option>SQL</option>
        <option>HTML/CSS</option>
      </select>
      <button className="btn btn-success">Add card</button>
      {message && <p className="text-success mt-2 mb-0">{message}</p>}
    </form>
  );
}