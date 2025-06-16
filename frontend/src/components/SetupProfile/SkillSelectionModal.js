// src/components/SkillSelectionModal.js
import React, { useState } from "react";
import {
  Modal,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import categories from "../data/categories";

const SkillSelectionModal = ({ open, handleClose, handleUserInfoUpdate }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleChange = (event) => {
    setSelectedSkills(event.target.value);
  };

  const handleSave = () => {
    handleUserInfoUpdate({ skills: selectedSkills });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-container max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
        <Typography variant="h6" gutterBottom>
          Select Your Skills
        </Typography>
        <Select
          multiple
          value={selectedSkills}
          onChange={handleChange}
          fullWidth
          displayEmpty
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <div className="flex justify-center mt-4">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            className="bg-teal-600 hover:bg-teal-700"
          >
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default SkillSelectionModal;
