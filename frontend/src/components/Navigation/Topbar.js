import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Tooltip,
  Menu,
  Button,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import logo from "../../assets/skillspherelogo.png";

const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projectMenuAnchorEl, setProjectMenuAnchorEl] = useState(null);
  const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] = useState(null);
  const [projectButtonText, setProjectButtonText] = useState("Projects");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (location.pathname === "/project") {
      setProjectButtonText("My Project");
    } else if (location.pathname === "/project/applied") {
      setProjectButtonText("Applied Projects");
    } else {
      setProjectButtonText("Projects");
    }
  }, [location.pathname]);

  const handleOpenProjectMenu = (event) => {
    setProjectMenuAnchorEl(event.currentTarget);
  };
  const handleCloseProjectMenu = () => {
    setProjectMenuAnchorEl(null);
  };

  const handleOpenSettingsMenu = (event) => {
    setSettingsMenuAnchorEl(event.currentTarget);
  };
  const handleCloseSettingsMenu = () => {
    setSettingsMenuAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProjectMenuClick = (route) => {
    navigate(route);
    handleCloseProjectMenu();
  };

  const isActiveRoute = (route) => {
    if (route === "/dashboard") return location.pathname === "/dashboard";
    if (route === "/tasklist") return location.pathname === "/tasklist";
    if (route === "/messages") return location.pathname === "/messages";
    if (route === "/project" || route === "/project/applied") {
      return location.pathname === "/project" || location.pathname === "/project/applied";
    }
    return false;
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#00223D", boxShadow: 1 }}>
      <Toolbar className="flex justify-between overflow-auto">
        {/* Left Side */}
        <Box className="flex items-center gap-6">
          <img src={logo} alt="SkillSphere Logo" style={{ height: 60 }} />

          {/* Dashboard */}
          <Box
            onClick={() => navigate("/dashboard")}
            sx={{
              cursor: "pointer",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              "&:hover": {
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
              position: "relative",
            }}
          >
            <Typography variant="body1">Dashboard</Typography>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                height: "2px",
                backgroundColor: isActiveRoute("/dashboard") ? "white" : "transparent",
                transition: "background-color 0.3s",
              }}
            />
          </Box>

          {/* Tasks */}
          <Box
            onClick={() => navigate("/tasklist")}
            sx={{
              cursor: "pointer",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              "&:hover": {
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
              position: "relative",
            }}
          >
            <Typography variant="body1">Tasks</Typography>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                height: "2px",
                backgroundColor: isActiveRoute("/tasklist") ? "white" : "transparent",
                transition: "background-color 0.3s",
              }}
            />
          </Box>

          {/* Projects */}
          <Box
            onClick={handleOpenProjectMenu}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              "&:hover": {
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
              position: "relative",
            }}
          >
            <Typography variant="body1">{projectButtonText}</Typography>
            <ArrowDropDownIcon sx={{ ml: 0.5 }} />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                height: "2px",
                backgroundColor: isActiveRoute("/project") ? "white" : "transparent",
                transition: "background-color 0.3s",
              }}
            />
          </Box>

          <Menu
            anchorEl={projectMenuAnchorEl}
            open={Boolean(projectMenuAnchorEl)}
            onClose={handleCloseProjectMenu}
            MenuListProps={{
              onMouseLeave: handleCloseProjectMenu,
            }}
          >
            <MenuItem onClick={() => handleProjectMenuClick("/project")}>My Project</MenuItem>
            <MenuItem onClick={() => handleProjectMenuClick("/project/applied")}>
              Applied Projects
            </MenuItem>
          </Menu>

          {/* Messages */}
          {/* <Box
            onClick={() => navigate("/messages")}
            sx={{
              cursor: "pointer",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              "&:hover": {
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
              position: "relative",
            }}
          >
            <Typography variant="body1">Messages</Typography>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                height: "2px",
                backgroundColor: isActiveRoute("/messages") ? "white" : "transparent",
                transition: "background-color 0.3s",
              }}
            />
          </Box> */}
        </Box>

        {/* Right Side */}
        <Box className="flex items-center space-x-2">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "green",
              "&:hover": { backgroundColor: "#1e40af" },
              borderRadius: "12px",
              textTransform: "capitalize",
              px: 3,
              py: 1.5,
              fontWeight: 600,
            }}
            onClick={() => navigate("/add/work")}
          >
            Create New Work
          </Button>

          {user && (
            <Box className="flex items-center gap-3 px-3 py-1 bg-gray-100 rounded-full shadow-sm hover:shadow-md transition duration-300">
              <Avatar
                src="/assets/user.jpg"
                alt={user.username}
                className="w-9 h-9 ring-2 ring-blue-500"
              />
              <Typography
                variant="body1"
                className="text-sm sm:text-base font-semibold text-gray-800"
              >
                {user.username}
              </Typography>
              <Tooltip title="Profile Options" arrow>
                <IconButton
                  onClick={handleOpenSettingsMenu}
                  size="small"
                  sx={{ p: 0.5 }}
                  className="hover:bg-gray-200 transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 12h.01M12 12h.01M18 12h.01"
                    />
                  </svg>
                </IconButton>
              </Tooltip>
            </Box>
          )}

          <Menu
            anchorEl={settingsMenuAnchorEl}
            open={Boolean(settingsMenuAnchorEl)}
            onClose={handleCloseSettingsMenu}
            MenuListProps={{
              onMouseLeave: handleCloseSettingsMenu,
            }}
          >
            <MenuItem
              onClick={() => {
                handleCloseSettingsMenu();
                navigate("/profile");
              }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
