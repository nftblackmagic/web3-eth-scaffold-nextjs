export const getHistoryString = (chatHistory) => {
  let historyString = "";
  chatHistory.forEach((message) => {
    historyString += message.sender + ": " + message.message + "\n";
  });
  return historyString;
};

export const addMessage = (chatHistory, message, sender) => {
  let newChatHistory = chatHistory;
  newChatHistory.push({ message, sender });
  return newChatHistory;
};
