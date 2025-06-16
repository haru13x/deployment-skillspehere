import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import ConversationList from "../components/Message/ConversationList";
import Messenger from "../components/Message/Messenger";
import Topbar from "../components/Navigation/Topbar";
const MessengerPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <Topbar />
      <Box
        sx={{
          display: "flex",
          height: "100vh", // Full viewport height
          bgcolor: "#f0f2f5",
          overflow: "hidden", // Prevent page scroll
        }}
      >
        <Box sx={{ width: 270, borderRight: "1px solid #e0e0e0" }}>
          <ConversationList onSelectUser={setSelectedUser} />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Messenger selectedUser={selectedUser} />
        </Box>
      </Box>
    </div>
  );
};

export default MessengerPage;
