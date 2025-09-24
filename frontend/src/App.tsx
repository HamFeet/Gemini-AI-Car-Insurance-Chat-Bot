import { useEffect, useState } from "react";
import "./App.css"

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
    <>
      <div className="content">
        <div className="title"><h3>Tina - Your Insurance Policy Assistant</h3></div>
        <div className="questionAnswerField">
          <p className="question">{message}</p>
          <p className="answer">{message}</p>
        </div>
        <div className="inputField">
          <textarea name="" id="inputArea"></textarea>
          <button className="inputButton">Submit</button>
        </div>
      </div>
    </>
  );
}

export default App;