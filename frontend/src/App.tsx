import { useEffect, useRef, useState } from "react";
import "./App.css"

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]);
  const inputAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch("/api/generate")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("Fetch error:", err));
  }, [questions]);

  const submitAnser = () => {
    if (inputAreaRef.current){
      const currentValue = inputAreaRef.current.value;
      setQuestions(prevQuestions => [...prevQuestions, currentValue]);
      console.log(`Answer submitted: ${currentValue}`)
      console.log(`Answer submitted: ${questions}`)
    }
  }

  return (
    <>
      <div className="content">
        <div className="title"><h3>Tina - Your Insurance Policy Assistant</h3></div>
        <div className="questionAnswerField">
          <p className="question">{message ? message :"Message rendering"}</p>
          <p className="answer">{message}</p>
        </div>
        <div className="inputField">
          <textarea placeholder="Write your answer here..." ref={inputAreaRef}></textarea>
          <button id="submitButton" onClick={submitAnser} className="inputButton">Submit</button>
        </div>
      </div>
    </>
  );
}

export default App;