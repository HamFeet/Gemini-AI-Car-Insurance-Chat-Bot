import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState<String[]>([]);

  // const submitAnswer

  useEffect(() => {
    fetch("/api/generate")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <h2>{message}</h2>
  );
}

export default App;