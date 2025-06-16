// TaskDetail.jsx
import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  ButtonGroup,
  Chip,
} from "@mui/material";
import { UseMethods } from "../../composable/UseMethods";

const statusMap = {
  1: "ongoing",
  2: "checking",
  3: "revise",
  4: "done",
};
const reverseStatusMap = {
  ongoing: 1,
  checking: 2,
  revise: 3,
  done: 4,
};

const TaskDetail = ({ taskId }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [guidance, setGuidance] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [comment, setComment] = useState("");
  const [markDone, setMarkDone] = useState(false);
  const [markRevise, setMarkRevise] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ongoing");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newInstruction, setNewInstruction] = useState({ title: "", description: "" });
  const [work, setWork] = useState([]);

  const fetchGuidance = async () => {
    setLoading(true);
    try {
      const res = await UseMethods("get", "get-instruction", "", taskId);
      const raw = res.data?.data || [];
      const formatted = raw.map((item) => ({
        id: item.id,
        step: item.title,
        instruction: item.description,
        deadline: item.deadline_at ?? "No deadline",
        comment: item.comment ?? "",
        status: statusMap[item.status] || "ongoing",
        step_order: item.step_order,
      }));
      setGuidance(formatted);
      setWork(res.data.work);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuidance();
  }, [taskId]);

  const visibleGuidance = guidance.filter((item) => {
    if (user?.id === work.client_id) {
      return statusFilter === "all" || item.status === statusFilter;
    } else {
      const allowedStatuses = ["ongoing", "revise", "done"];
      return (
        (statusFilter === "all" && allowedStatuses.includes(item.status)) ||
        (item.status === statusFilter && allowedStatuses.includes(item.status))
      );
    }
  });

  const openSubmitDialog = (index) => {
    setSelectedIndex(index);
    const current = visibleGuidance[index];
    setComment(current.comment || "");
    setMarkDone(false);
    setMarkRevise(false);
    setOpenDialog(true);
  };

  const handleSubmitProgress = async () => {
    const selected = visibleGuidance[selectedIndex];
    const globalIndex = guidance.findIndex((g) => g.id === selected.id);
    const updated = [...guidance];

    let newStatus = reverseStatusMap[selected.status];
    if (selected.status === "ongoing" || selected.status === "revise") {
      newStatus = 2;
    } else if (selected.status === "checking") {
      if (markDone) newStatus = 4;
      else if (markRevise) newStatus = 3;
    }

    try {
      await UseMethods("put", `instruction-progress/${selected.id}`, {
        status: newStatus,
        comment: comment.trim(),
      });
      updated[globalIndex] = {
        ...selected,
        status: statusMap[newStatus],
        comment: comment.trim(),
      };
      setGuidance(updated);
    } catch (err) {
      console.error("Update error:", err);
    }

    setOpenDialog(false);
  };

  const handleAddInstruction = async () => {
    try {
      const res = await UseMethods("post", "add-work-instruction", {
        work_id: taskId,
        title: newInstruction.title,
        description: newInstruction.description,
        step_order: guidance.length + 1,
      });
      setGuidance((prev) => [
        ...prev,
        {
          id: res.data.id,
          step: newInstruction.title,
          instruction: newInstruction.description,
          deadline: "No deadline",
          comment: "",
          status: "ongoing",
          step_order: guidance.length + 1,
        },
      ]);
    } catch (err) {
      console.error("Add error:", err);
    }

    setOpenAddDialog(false);
    setNewInstruction({ title: "", description: "" });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "done": return "#10b981";
      case "revise": return "#f59e0b";
      case "checking": return "#6366f1";
      default: return "#3b82f6";
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "#003050", minHeight: "100vh", width:'100%', color: "#fff" }}>
      {/* HEADER */}
      <Box sx={{ mb: 3, p: 2, backgroundColor: "#fff", borderRadius: 2, color: "#003050", display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center", gap: 2 }}>
        {[ ["Client", work?.client], ["Assigned", work?.assigned] ].map(([label, user]) => (
          <Box key={label} sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, minWidth: "250px" }}>
           <Avatar
  sx={{ bgcolor: "#10b981", width: 56, height: 56 }}
  src={
    user?.profile?.profile_picture
      ? `http://localhost:8000/storage/${user.profile.profile_picture}`
      : undefined
  }
>
  {user?.name?.charAt(0).toUpperCase() || "?"}
</Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{label}</Typography>
              <Typography variant="body1">{user?.name}</Typography>
              <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* FILTERS + ADD BUTTON */}
      <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
        <Typography variant="h5" sx={{ mr: 2 }}>📋 Task Instructions
      </Typography>
        <ButtonGroup variant="outlined">
          {(user?.id === work.client_id ? ["ongoing", "checking", "revise", "done", "all"] : ["ongoing", "revise", "done"]).map((status) => (
            <Button key={status} variant={statusFilter === status ? "contained" : "outlined"} onClick={() => setStatusFilter(status)}
              sx={{ backgroundColor: statusFilter === status ? "#10b981" : "#fff", color: statusFilter === status ? "#fff" : "#003050" }}>
              {status.toUpperCase()}
            </Button>
          ))}
        </ButtonGroup>

        {user?.id === work.client_id && (
          <Button variant="contained" sx={{ backgroundColor: "#10b981", ml: 2 }} onClick={() => setOpenAddDialog(true)}>
            ➕ Add Instruction
          </Button>
        )}
      </Box>

      {/* INSTRUCTION LIST */}
      

      <Stack spacing={3} sx={{ width: '100%' }}>
        {visibleGuidance.length === 0 ? (
          <Card sx={{ backgroundColor: 'red', width: '100%' }}>
            <CardContent>
              <Typography variant="h6" align="center">
                😕 No instructions found for this filter.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          visibleGuidance.map((item, index) => (
            <Card key={item.id} sx={{ width: '100%', borderLeft: `8px solid ${getStatusColor(item.status)}`, backgroundColor: '#f9fafb', transition: 'transform 0.2s ease', ':hover': { transform: 'scale(1.01)' } }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                  <Typography fontWeight={600}>{index + 1}. {item.step}</Typography>
                  <Chip label={item.status.toUpperCase()} size="small" sx={{ backgroundColor: getStatusColor(item.status), color: '#fff', fontWeight: 600, mt: { xs: 1, md: 0 } }} />
                </Box>

                <Typography variant="caption" mt={1}>📅 Deadline: {item.deadline}</Typography>
                <Box sx={{ backgroundColor: '#fff', p: 2, mt: 1, borderRadius: 1, border: '1px solid #e5e7eb', width: '100%' }}>{item.instruction}</Box>

                {item.comment && (
                  <Typography variant="body2" mt={1} sx={{ fontStyle: 'italic' }}>
                    💬 Comment: {item.comment}
                  </Typography>
                )}

                {item.status !== 'done' && (
                  <Box mt={2}>
                    <Button fullWidth variant="contained" sx={{ backgroundColor: '#003050', color: '#fff' }} onClick={() => openSubmitDialog(index)}>
                      Submit / Review
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </Stack>

      {/* Submit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', bgcolor: '#003050', color: '#fff' }}>Submit / Review Progress</DialogTitle>
        <DialogContent dividers sx={{ py: 3 }}>
          {selectedIndex !== null && visibleGuidance[selectedIndex] && (
            <>
              <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}><strong>🧹 Step:</strong> {visibleGuidance[selectedIndex].step}</Typography>
              <TextField label="💬 Comment" placeholder="Add your comment here..." multiline rows={3} fullWidth value={comment} onChange={(e) => setComment(e.target.value)} sx={{ mb: 2 }} />
              {visibleGuidance[selectedIndex].status === "checking" && user?.id === work.client_id && (
                <Box mt={1}>
                  <FormControlLabel control={<Checkbox checked={markDone} onChange={(e) => setMarkDone(e.target.checked)} />} label="✅ Mark as Done" />
                  <FormControlLabel control={<Checkbox checked={markRevise} onChange={(e) => setMarkRevise(e.target.checked)} />} label="✏️ Request Revision" />
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">Cancel</Button>
          <Button variant="contained" sx={{ backgroundColor: "#003050" }} onClick={handleSubmitProgress} disabled={!comment.trim()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', bgcolor: '#003050', color: '#fff' }}>➕ Add Instruction</DialogTitle>
        <DialogContent dividers sx={{ py: 3 }}>
          <TextField label="📌 Title" fullWidth margin="dense" value={newInstruction.title} onChange={(e) => setNewInstruction({ ...newInstruction, title: e.target.value })} sx={{ mb: 2 }} />
          <TextField label="📄 Description" fullWidth multiline rows={3} margin="dense" value={newInstruction.description} onChange={(e) => setNewInstruction({ ...newInstruction, description: e.target.value })} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenAddDialog(false)} variant="outlined">Cancel</Button>
          <Button variant="contained" sx={{ backgroundColor: "#003050" }} onClick={handleAddInstruction} disabled={!newInstruction.title.trim() || !newInstruction.description.trim()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskDetail;