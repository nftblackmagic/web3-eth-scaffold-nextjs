import { useChatGpt } from "../../hooks/useChatGpt";
import { addMessage } from "../../utils/chatHistory";
import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { ChatHistoryFrame } from "./ChatHistoryFrame";

export const ChatContainer = ({ promptId }) => {
  const [pendingMessage, setPendingMessage] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState([]);
  const { isLoading, history, isSuccess, isError } = useChatGpt(
    message,
    promptId,
    chatHistory
  );

  useEffect(() => {
    if (isSuccess || isError) {
      setMessage("");
    }
  }, [isSuccess, isError]);

  return (
    <div id="chat-container">
      <ChatHistoryFrame chatHistory={chatHistory} isLoading={isLoading} />
      <div id="chat-input">
        <TextField
          type="text"
          onChange={(e) => {
            setPendingMessage(e.target.value);
          }}
        />
        <Button
          style={{
            backgroundColor: "black",
            width: "80px",
          }}
          variant="contained"
          onClick={() => {
            setMessage(pendingMessage);
            setChatHistory(addMessage(history || [], pendingMessage, "user"));
          }}
        >
          Send
        </Button>
        <Button
          style={{
            color: "black",
            width: "80px",
            borderColor: "black",
          }}
          variant="outlined"
          onClick={() => {
            setMessage("");
            setChatHistory([]);
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};
