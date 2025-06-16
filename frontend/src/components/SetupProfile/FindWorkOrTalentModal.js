import React, { useState } from "react";
import {
  Modal,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const FindWorkOrTalentModal = ({
  open,
  handleClose,
  handleUserInfoUpdate,
  nextStep,
}) => {
  const [selection, setSelection] = useState("");

  const handleSelection = (value) => {
    setSelection(value);
  };

  const handleNext = () => {
    if (selection) {
      handleUserInfoUpdate({ workOrTalent: selection });
      nextStep();
      handleClose();
    }
  };

  const renderCard = (value, title, description) => {
    const isSelected = selection === value;

    return (
      <Card
        onClick={() => handleSelection(value)}
        className={`relative cursor-pointer transition-all duration-300 rounded-lg shadow-md hover:shadow-xl w-full max-w-sm ${
          isSelected
            ? "bg-teal-600 text-white scale-105 border-2 border-teal-800"
            : "bg-gray-100"
        }`}
      >
        {isSelected && (
          <CheckCircleIcon className="absolute top-2 right-2 text-white bg-teal-700 rounded-full" />
        )}
        <CardContent>
          <Typography variant="h6" className="text-center">
            {title}
          </Typography>
          <Typography variant="body2" className="text-center mt-2">
            {description}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-container max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-lg text-center">
        <Typography variant="h6" gutterBottom className="mb-6">
          Join as
        </Typography>

        <div className="flex flex-col items-center gap-4">
          {renderCard(
            "work",
            "Find Work",
            "Browse work opportunities based on your expertise and interests."
          )}
          {renderCard(
            "talent",
            "Find Talent",
            "Discover and hire talented individuals for your project."
          )}
        </div>

        <div className="flex justify-end mt-6">
          {/* <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button> */}
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={!selection}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            Next
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default FindWorkOrTalentModal;
