import { useEffect, useState } from "react";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [inputText, setInputText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/health`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        return response.json();
      })
      .then((data) => {
        setBackendStatus(data.status);
      })
      .catch((error) => {
        console.error(error);
        setBackendStatus("Disconnected");
      });
  }, []);

  const handlePrediction = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text.");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input_text: inputText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();

      setPrediction(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Application</h1>

      <h2>System Status</h2>

      <p>
        Backend Status: <strong>{backendStatus}</strong>
      </p>

      <hr />

      <h2>AI Prediction</h2>

      <input
        type="text"
        placeholder="Enter something..."
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
      />

      <button onClick={handlePrediction} disabled={loading}>
        {loading ? "Processing..." : "Predict"}
      </button>

      {error && (
        <p>
          <strong>Error:</strong> {error}
        </p>
      )}

      {prediction && (
        <div>
          <h3>Result</h3>

          <p>
            Prediction: <strong>{prediction.prediction}</strong>
          </p>

          <p>
            Confidence: <strong>{prediction.confidence}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

