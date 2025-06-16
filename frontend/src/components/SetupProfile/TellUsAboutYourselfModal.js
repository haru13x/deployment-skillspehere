import React, { useState } from "react";
import {
  Modal,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const TellUsAboutYourselfModal = ({
  open,
  handleClose,
  handleUserInfoUpdate,
  previousModal,
  nextModal,
}) => {
  const [aboutYou, setAboutYou] = useState("");

  const handleNext = () => {
    handleUserInfoUpdate({ aboutYou });
    handleClose();
    if (nextModal) nextModal(); // open the next modal
  };

  const handleBack = () => {
    handleClose();
    if (previousModal) previousModal(); // go back to JoinUs modal
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-container max-w-md mx-auto mt-24 p-6 bg-white rounded-2xl shadow-2xl">
        <div className="flex items-center mb-4">
          <IconButton onClick={handleBack} className="mr-2">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className="font-semibold">
            Tell Us About Yourself
          </Typography>
        </div>

        <div className="mb-6">
          <Typography variant="subtitle1" className="mb-2 font-medium">
            What do you do?
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g., Web Developer, Graphic Designer, Virtual Assistant"
            variant="outlined"
            value={aboutYou}
            onChange={(e) => setAboutYou(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <Typography variant="subtitle1" className="mb-2 font-medium">
            Tell us a bit more about yourself
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Your background, skills, interests, goals..."
            variant="outlined"
            value={aboutYou}
            onChange={(e) => setAboutYou(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button onClick={handleBack} variant="outlined">
            Back
          </Button>
          <Button
            onClick={handleNext}
            variant="contained"
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            Next
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default TellUsAboutYourselfModal;
