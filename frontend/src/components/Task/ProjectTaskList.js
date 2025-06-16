import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  CircularProgress
} from "@mui/material";
import { WorkOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Dialog } from '@mui/material/Dialog';
import { DialogTitle } from '@mui/material/DialogTitle';
import { AlignJustify } from "lucide-react";

const TaskList = ({ tasks, loading }) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [rateRange, setRateRange] = useState([0, 100]);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleRateChange = (event, newValue) => {
    setRateRange(newValue);
    const filtered = tasks.filter(
      (task) => task.rate >= newValue[0] && task.rate <= newValue[1]
    );
    setFilteredTasks(filtered);
  };

  const goToTask = (id) => {
    navigate(`/task/${id}`);
  };

  const editTask = (id) => {
    navigate(`/edit/work/${id}`);
  }

  return (
    <Box className="p-6" sx={{ backgroundColor: "#003754", minHeight: "100vh" }}>
      {loading ? (
        <Box className="flex justify-center mt-8">
          <CircularProgress />
        </Box>
      ) : (
        <Grid>
          <Grid item xs={12} md={9}>
            <List className="divide-y divide-gray-200">
              {filteredTasks.length === 0 ? (
                <Typography className="text-gray-200">
                  No tasks found.
                </Typography>
              ) : (
                filteredTasks.map((task) => (
                  <ListItem
                    key={task.id}
                    onClick={() => goToTask(task.id)}
                    // onClick={() => goToTask(task.id)
                    className="cursor-pointer bg-white rounded-lg p-4 mb-2"
                    sx={{
                      transition: "box-shadow 0.3s ease",
                      boxShadow: "none",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(255, 255, 255, 0.8)",
                      },
                    }}
                  >
                    <Box onClick={() => goToTask(task.id)}>
                      <Typography
                        variant="h6"
                        className="flex items-center gap-2 text-teal-700"
                      >
                        <WorkOutline fontSize="small" />
                        {task.title}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        <strong>Rate:</strong> ${task.rate}
                      </Typography>
                      <Typography variant="body2" className="text-gray-500">
                        {task.description ?? "No description provided."}
                      </Typography>
                    </Box>
                  
                  </ListItem>
                ))
              )}
            </List>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default TaskList;
