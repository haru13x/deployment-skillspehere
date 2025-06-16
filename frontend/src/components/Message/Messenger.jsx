import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import dummyMessages from "../../data/dummyMessages";

const Messenger = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      setMessages(dummyMessages[selectedUser.id] || []);
    }
  }, [selectedUser]);

  useEffect(() => {
    // Auto-scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      sender: "me",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  if (!selectedUser) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Select a conversation to start messaging.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        bgcolor: "#f9fafb",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: selectedUser.online ? "#4caf50" : "#9e9e9e",
          }}
        />

        <Typography variant="h6" fontWeight={700}>
          {selectedUser.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          • {selectedUser.online ? "Online" : "Offline"}
        </Typography>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          px: 3,
          py: 2,
          mb: 10, // space for fixed input box
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
              mb: 2,
            }}
          >
            <Paper
              elevation={1}
              sx={{
                px: 2,
                py: 1,
                maxWidth: "60%",
                backgroundColor: msg.sender === "me" ? "#d1e7dd" : "#e3f2fd",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2">{msg.text}</Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.7rem" }}
              >
                {msg.time}
              </Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Fixed Input */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 320, // adjust if your sidebar is different width
          right: 0,
          px: 3,
          py: 2,
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "white",
        }}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            size="small"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button variant="contained" onClick={handleSend} sx={{ px: 3 }}>
            Send
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Messenger;
