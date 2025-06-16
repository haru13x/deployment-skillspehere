import React, { useEffect, useState, useRef } from "react";
import Topbar from "../components/Navigation/Topbar";

import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Divider,
  Paper,
  Chip,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tabs,
  Tab,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UseMethods } from "../composable/UseMethods";

const TaskDetails = () => {
  const { id } = useParams();
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [rateType, setRateType] = useState("hourly");
  const [rateValue, setRateValue] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [applicants, setApplicants] = useState([]);
  const [hasApplied, setHasApplied] = useState(false);
const user = JSON.parse(localStorage.getItem("user"));
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (tabIndex === 0) {
          const taskRes = await UseMethods("get", "get-task-details", "", id);
          if (taskRes) {
            setTaskData(taskRes.data.data);
          }
        } else if (tabIndex === 1) {
          const applicantsRes = await UseMethods(
            "get",
            "get-applicants",
            "",
            id
          );
          if (applicantsRes) {
            setApplicants(applicantsRes.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tabIndex, id]);

  useEffect(() => {
    const checkApplicationStatus = async () => {
      try {
        const res = await UseMethods("get", "check-application-status", "", id);
        if (res && res.data.hasApplied === true) {
          setHasApplied(true);
        }
      } catch (error) {
        console.error("Error checking application status:", error);
      }
    };

    checkApplicationStatus();
  }, [id]);

  const handleSubmitApplication = async () => {
    try {
      const applicationData = {
        work_id: id,
        proposal: coverLetter,
        proposal_currency: rateType,
        proposal_rate: rateValue,
      };

      const res = await UseMethods("post", "store-proposal", applicationData);
      console.log("Task saved:", res.data);
      setHasApplied(true);
      alert("Task applied successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit task.");
    }
  };
const hireApplicant = async (appliedId, workId) => {
  const payload = {
    applied_id: appliedId,
    work_id: workId,
  };

  const response = await UseMethods("post", "hire-applicant", payload);

  if (response?.status === 201) {
    alert("Applicant successfully hired!");
    // Optional: update UI or state
  } else {
    alert("Hiring failed.");
  }
};

  const resetForm = () => {
    setCoverLetter("");
    setRateType("hourly");
    setRateValue("");
  };

  if (loading) {
    return (
      <Box className="flex justify-center mt-10">
        <CircularProgress />
      </Box>
    );
  }

  if (!taskData && tabIndex === 0) {
    return (
      <Box className="text-center mt-10 text-red-500">Task not found.</Box>
    );
  }

  const task = taskData ? taskData[0] : null;

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Topbar />
      <Box className="p-6 max-w-5xl mx-auto space-y-6">
        <Box className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <Typography variant="h4" className="text-blue-800 font-semibold">
            {task ? task.title : "Loading..."}
          </Typography>
        </Box>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="Task Details"
        >
          <Tab label="Task Details" />
          <Tab label="Applicants" />
        </Tabs>

        {tabIndex === 0 && (
          <Paper elevation={1} className="p-4 rounded-lg bg-white mt-4">
             {user?.id === task?.client_id && (
              <div className="buttons-container">
                      <Button class="edit-button" >Edit</Button>
                      <Button class="delete-button" >Delete</Button>
                    </div>)}
            {task && (
              <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <Typography variant="body2" className="text-gray-500">
                    Budget
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    ${task.rate}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body2" className="text-gray-500">
                    Posted
                  </Typography>
                  <Typography variant="subtitle2">
                    {new Date(task.created_at).toLocaleString()}
                  </Typography>
                </div>
              </Box>
            )}

            <Paper
              elevation={1}
              className="p-6 bg-white rounded-lg space-y-2 mt-4"
            >
              <Typography variant="h6" className="text-gray-800 font-semibold">
                Project Description
              </Typography>
              <Divider />
              <Typography
                variant="body1"
                className="text-gray-700 whitespace-pre-line leading-relaxed"
              >
                {task?.description}
              </Typography>
              <Paper elevation={1} className="p-4 rounded-lg bg-white mt-6">
                <Typography
                  variant="h6"
                  className="text-gray-800 font-semibold"
                >
                  Required Skills
                </Typography>
                <Box className="flex flex-wrap gap-2 mt-2">
                  {task.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill.skills}
                      color="secondary"
                      size="small"
                    />
                  ))}
                </Box>
              </Paper>
            </Paper>

            {hasApplied ? (
              <Box className="text-center text-green-600 mt-4">
                <Typography variant="h6">
                  You have already applied for this task!
                </Typography>
              </Box>
            ) : (
              <Paper
                elevation={2}
                className="p-6 bg-white rounded-lg space-y-4 mt-4"
              >
                <Typography
                  variant="h6"
                  className="text-blue-700 font-semibold"
                >
                  Apply for this Task
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={9}
                  label="Why are you a good fit?"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                />

                <FormControl component="fieldset">
                  <FormLabel component="legend">Rate Type</FormLabel>
                  <RadioGroup
                    row
                    value={rateType}
                    onChange={(e) => setRateType(e.target.value)}
                  >
                    <FormControlLabel
                      value="hourly"
                      control={<Radio />}
                      label="Hourly"
                    />
                    <FormControlLabel
                      value="fixed"
                      control={<Radio />}
                      label="Fixed Rate"
                    />
                  </RadioGroup>
                </FormControl>

                <TextField
                  fullWidth
                  label={
                    rateType === "hourly"
                      ? "Proposed Hourly Rate ($/hr)"
                      : "Proposed Fixed Price ($)"
                  }
                  type="number"
                  value={rateValue}
                  onChange={(e) => setRateValue(e.target.value)}
                />

                <Box className="flex justify-end">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitApplication}
                    disabled={!coverLetter.trim() || !rateValue}
                  >
                    Submit Application
                  </Button>
                </Box>
              </Paper>
            )}
          </Paper>
        )}

        {tabIndex === 1 && (
          <Paper elevation={1} className="p-6 rounded-lg bg-white mt-4">
            <Typography variant="h6" className="text-blue-700 font-semibold">
              Applicants
            </Typography>

            {applicants.length > 0 ? (
              <Box>
                {applicants.map((applicant, index) => (
               
                  <Box
                    key={index}
                    className="mt-4 p-4 border-b border-gray-300"
                  >
                   
                    <Box className="flex items-center gap-4">
                      <Typography variant="body1" className="font-semibold">
                        
                        {applicant.user.firstname} {applicant.user.lastname}
                
                      </Typography>
                      <Chip
                        label={`Status: ${
                          applicant.status === 1 ? "Applied" : "Reviewed"
                        }`}
                        color={applicant.status === 1 ? "primary" : "default"}
                        size="small"
                      />
                    </Box>

                    <Typography variant="body2" className="text-gray-700 mt-2">
                      <strong>Proposal:</strong>
                      <div className="whitespace-pre-line">
                        {applicant.proposal}
                      </div>
                    </Typography>

                    <Typography variant="body2" className="text-gray-700 mt-2">
                      <strong>Proposed Rate:</strong> {applicant.proposal_rate}{" "}
                      {applicant.proposal_currency}
                    </Typography>

                    <Typography variant="body2" className="text-gray-500 mt-1">
                      <strong>Applied on:</strong>{" "}
                      {new Date(applicant.applied_date).toLocaleString()}
                    </Typography>

                    <Divider className="my-5" />
          {user.id === applicant.work.client_id && !applicant.work.assigned_user_id && (
  <Button 
    variant="contained" 
    color="primary" 
    sx={{ margin: 1 }}
    onClick={() => hireApplicant(applicant.applied_id, applicant.work.id)}
  >
    Hire
  </Button>
)}


                  </Box>

                ))}
              </Box>
            ) : (
              <Typography variant="body2" className="text-gray-500">
                No applicants yet.
              </Typography>
            )}
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default TaskDetails;
