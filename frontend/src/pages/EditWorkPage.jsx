import React, { useState, useRef } from "react";
import axios from "axios";
import Topbar from "../components/Navigation/Topbar";
import {
  TextField,
  Button,
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Autocomplete,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import { UseMethods } from "../composable/UseMethods";

const skillsList = [
  "JavaScript",
  "React",
  "Vue.js",
  "Laravel",
  "Node.js",
  "Python",
  "UI/UX",
  "Figma",
  "Tailwind",
  "PostgreSQL",
];

const currencyOptions = ["USD", "EUR", "PHP", "GBP"];

const EditWorkPage = () => {
  const taskId = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
  const [loading, setLoading] = useState(false);
  const [work, setWork] = useState({
    title: "",
    description: "",
    rate: "",
    deadline: "",
    priority: "medium",
    instructions: [],
    paymentType: "fixed",
    currency: "USD",
    amount: "",
    skills: [],
  });

  const handleChange = (e) => {
    setWork({ ...work, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formattedWork = {
        ...work,
        skills: work.skills.map((skill) => ({ skill })),
      };

      const res = await UseMethods("post", "tasks", formattedWork);
      console.log("Task saved:", res.data);
      resetForm();
      alert("Task created successfully!");
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("Failed to submit task.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setWork({
      title: "",
      description: "",
      rate: "",
      deadline: "",
      priority: "medium",
      instructions: [],
      paymentType: "fixed",
      currency: "USD",
      amount: "",
      skills: [],
    });
  };

  return (
    <div>
      <Topbar />
      <Box className="flex justify-center mt-8 w-full">
        <Box className="w-full md:w-[90%]">
          <Paper elevation={3} className="rounded-2xl overflow-hidden w-full">
            <Box className="bg-blue-600 text-white p-6">
              <Typography variant="h5" fontWeight="bold">
                Edit Project
              </Typography>
              {/* <Typography variant="subtitle2" color="white" mt={1}>
                Let freelancers know what you need done.
              </Typography> */}
            </Box>

            <Box className="p-6 space-y-6 bg-white">
              {/* Title */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Project Title
                </Typography>
                <TextField
                  fullWidth
                  placeholder="E.g. Build a website, Create a mobile app"
                  name="title"
                  value={work.title}
                  onChange={handleChange}
                />
              </Box>

              {/* Description */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Project Description
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="Describe your project in detail..."
                  name="description"
                  value={work.description}
                  onChange={handleChange}
                />
              </Box>

              {/* Payment */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Payment Type
                </Typography>
                <ToggleButtonGroup
                  color="primary"
                  value={work.paymentType}
                  exclusive
                  onChange={(e, newVal) => {
                    if (newVal) setWork({ ...work, paymentType: newVal });
                  }}
                >
                  <ToggleButton value="fixed">Fixed Price</ToggleButton>
                  <ToggleButton value="hourly">Hourly Rate</ToggleButton>
                </ToggleButtonGroup>

                <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <TextField
                    select
                    label="Currency"
                    name="currency"
                    value={work.currency}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  >
                    {currencyOptions.map((cur) => (
                      <MenuItem key={cur} value={cur}>
                        {cur}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label={
                      work.paymentType === "hourly"
                        ? "Hourly Rate"
                        : "Total Amount"
                    }
                    name="amount"
                    type="number"
                    value={work.amount}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Box>
              </Box>

              {/* Skills */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Required Skills
                </Typography>
                <Autocomplete
                  multiple
                  limitTags={5}
                  options={skillsList}
                  value={work.skills}
                  onChange={(e, newValue) => {
                    if (newValue.length <= 5) {
                      setWork({ ...work, skills: newValue });
                    }
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={option}
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select up to 5 skills"
                    />
                  )}
                />
              </Box>

              <Divider />

              {/* Submit */}
              <Box className="flex justify-end gap-4 pt-4">
                <Button
                  variant="outlined"
                  onClick={resetForm}
                  className="rounded-lg"
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="rounded-lg px-6"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </Box>
          </Paper>
          {/* </motion.div> */}
        </Box>
      </Box>
    </div>
  );
};

export default EditWorkPage;
