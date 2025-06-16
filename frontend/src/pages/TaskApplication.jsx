import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

const TaskApplication = () => {
  const { taskId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit application logic here
    alert(`Application submitted for Task ID: ${taskId}`);
  };

  return (
    <Box className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg space-y-6">
      <Typography variant="h5" className="text-blue-700 font-semibold">
        Apply for Task #{taskId}
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField fullWidth label="Proposal" multiline rows={6} required />
        <TextField fullWidth label="Your Rate ($)" type="number" required />
        <Button type="submit" variant="contained" color="primary">
          Submit Application
        </Button>
      </form>
    </Box>
  );
};

export default TaskApplication;
