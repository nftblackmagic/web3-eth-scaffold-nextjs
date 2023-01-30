import React, { useEffect, useRef } from "react";
import classes from "../../../styles/ChatHistoryFrame.module.css";

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
  return <div ref={elementRef} />;
};

export const ChatHistoryFrame = ({ chatHistory, isLoading }) => {
  return (
    <div id="chat-history-frame">
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={message.sender === "user" ? classes.user : classes.agent}
        >
          {message.message}
        </div>
      ))}
      {isLoading && <div className={classes.agent}>{"Loading..."}</div>}
      <AlwaysScrollToBottom />
    </div>
  );
};
