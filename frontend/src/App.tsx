import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'; // Import combined CSS file

export default function App() {
  const [result, setResult] = useState();
  const [question, setQuestion] = useState();
  const [file, setFile] = useState();

  const handleQuestionChange = (event: any) => {
    setQuestion(event.target.value);
  };

// Updated handleFileChange function
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      toast.success(`File "${selectedFile.name}" uploaded successfully!`);
    }
  };


  const handleSubmit = (event: any) => {
    event.preventDefault();

    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }
    if (question) {
      formData.append("question", question);
    }

    fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.result);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <div className={styles.appBlock}> {/* Apply styles using CSS module */}
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}> {/* Apply styles using CSS module */}
        <label className={styles.questionLabel} htmlFor="question">
          Question:
        </label>
        <input
          className={styles.questionInput} {/* Apply styles using CSS module */}
          id="question"
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Ask your question here"
        />

        <br></br>
        <label className={styles.fileLabel} htmlFor="file">
          Upload File:
        </label>

        <input
          type="file"
          id="file"
          name="file"
          accept=".csv, .txt, .docx, .pdf" // Allow additional file types
          onChange={handleFileChange}
          className={styles.fileInput} {/* Apply styles using CSS module */}
        />
        <br></br>
        <button
          className={styles.submitBtn} {/* Apply styles using CSS module */}
          type="submit"
          disabled={!file || !question}
        >
          Submit
        </button>
      </form>
      <p className={styles.resultOutput}>Result: {result}</p> {/* Apply styles using CSS module */}
    </div>
  );
}
