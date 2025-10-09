import { useEffect, useRef, useState } from "react";
import "./App.css"
import React from "react";

const App: React.FC = () => {
  const initialGreeting = "I'm Tina 🙋🏿‍♀️. I help you choose the right insurance policy 📜. May I ask you a few questions to make sure I reccomend the best policy for you?";
  const [count, setCount] = useState<number>(0);
  const [questions, setQuestions] = useState<string[]>([initialGreeting]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submissionStatus, setSubmissionStatus] = useState<string>(''); 
  const inputAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (count > 0){ 
      setSubmissionStatus(`✅ Answer submitted. Tina is thinking of the next question...`);
      const dataToSend = {answers, questions}
      fetch("/api/generate/question",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        console.log("Response from backend:", data);
        setQuestions(prevQuestions => [...prevQuestions, data.message]);
        setSubmissionStatus(''); 
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setSubmissionStatus('❌ Error fetching next question. Please try again.');
      });
    }
  }, [count]);
 
  const submitAnswer = () => {
    if (inputAreaRef.current){
      const currentValue = inputAreaRef.current.value.trim();
      
      if (!currentValue) return;
      setAnswers(prevAnswers => [...prevAnswers, currentValue]);
      setCount(prevCount => prevCount + 1); 
      inputAreaRef.current.value = '';
    }
  }

  return (
    <>
      <div className="content">
        <div className="title"><h3>Tina - Your Insurance Policy Assistant</h3></div>
        <div className="questionAnswerField">
          {questions.map((q, index) => {
              const answer = answers[index]; 
              
              return (
                  <React.Fragment key={index}>
                    <p className="question">
                      {q}
                    </p>
                    {answer && (
                      <p className="answer">
                        {answer}
                      </p>
                    )}
                      
                  </React.Fragment>
              );
          })}
          {submissionStatus && (
            <p className="status-confirmation p-3 bg-yellow-100 text-yellow-800 rounded-lg shadow-md font-semibold italic text-sm">
              {submissionStatus}
            </p>
          )}
        </div>
        <div className="inputField">
          <textarea placeholder="Write your answer here..." ref={inputAreaRef}></textarea>
          <button id="submitButton" onClick={submitAnswer} className="inputButton">Submit</button>
        </div>
      </div>
    </>
  );
}

export default App;