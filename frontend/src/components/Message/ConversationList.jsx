import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Typography,
  Box,
  Badge,
  Divider,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const dummyUsers = [
  {
    id: 1,
    name: "Aki",
    online: true,
    unread: true,
    lastMessage: "Hey! Are you there?",
  },
  {
    id: 2,
    name: "Jude",
    online: true,
    unread: false,
    lastMessage: "Okay cool. 👍",
  },
  {
    id: 3,
    name: "Mika",
    online: true,
    unread: true,
    lastMessage: "Let’s sync up later.",
  },
];

// Same dummyUsers array...

const ConversationList = ({ onSelectUser }) => {
  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "#fff",
        borderRadius: 3,
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          Conversations
        </Typography>
      </Box>

      <Box sx={{ overflowY: "auto", flexGrow: 1, px: 2, pb: 2 }}>
        <List disablePadding>
          {dummyUsers.map((user, idx) => (
            <React.Fragment key={user.id}>
              <ListItem
                button
                onClick={() => onSelectUser(user)}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1.5,
                  mb: 1,
                  backgroundColor: "#f9fafb",
                  "&:hover": {
                    backgroundColor: "#e5e7eb",
                  },
                }}
              >
                <ListItemAvatar>
                  <Badge
                    color={user.online ? "success" : "default"}
                    variant="dot"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    overlap="circular"
                  >
                    <Avatar>{user.name[0]}</Avatar>
                  </Badge>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography
                      fontWeight={user.unread ? 600 : 500}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      {user.name}
                      {user.unread && (
                        <CircleIcon color="primary" sx={{ fontSize: 10 }} />
                      )}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      noWrap
                    >
                      {user.lastMessage}
                    </Typography>
                  }
                />
              </ListItem>
              {idx < dummyUsers.length - 1 && (
                <Divider variant="inset" component="li" sx={{ ml: 9 }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ConversationList;
