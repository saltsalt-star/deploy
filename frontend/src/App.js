import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };

    // 사용자 메시지 먼저 추가
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("https://deploy-3488.onrender.com/echo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();

      const botMessage = {
        role: "bot",
        text: data.you_sent + " (길이: " + data.length + ")",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("에러:", err);

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "에러 발생" },
      ]);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>채팅 UI</h1>

      {/* 메시지 영역 */}
      <div
        style={{
          border: "1px solid #ccc",
          height: "400px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "10px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "10px",
                background:
                  msg.role === "user" ? "#DCF8C6" : "#eee",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* 입력 영역 */}
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지 입력"
          style={{ width: "70%", padding: "8px" }}
        />
        <button onClick={sendMessage} style={{ padding: "8px" }}>
          전송
        </button>
      </div>
    </div>
  );
}

export default App;