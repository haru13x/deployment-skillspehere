// src/AppRouter.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import TaskListPage from "./pages/TaskListPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import MessagePage from "./pages/MessagePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ProtectedRoute from "./middleware/ProtectedRoute"; // 👈 import this
import ProjectPage from "./pages/ProjectPage";
import TaskDetails from "./pages/TaskDetails";
import TaskApplication from "./pages/TaskApplication";
import AddWorkPage from "./pages/AddWorkPage";
import AppliedProject from "./pages/AppliedProject";
import Profiling from "./pages/Auth/ProfilingPage";
import EditWorkPage from "./pages/EditWorkPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasklist"
        element={
          <ProtectedRoute>
            <TaskListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project"
        element={
          <ProtectedRoute>
            <ProjectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <MessagePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add/work"
        element={
          <ProtectedRoute>
            <AddWorkPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/apply/:taskId"
        element={
          <ProtectedRoute>
            <TaskApplication />
          </ProtectedRoute>
        }
      />
      <Route
        path="/setting-up/profile"
        element={
          <ProtectedRoute>
            <Profiling />
          </ProtectedRoute>
        }
      />

      <Route
        path="/task/:id"
        element={
          <ProtectedRoute>
            <TaskDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/project/applied"
        element={
          <ProtectedRoute>
            <AppliedProject />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit/work/:id"
        element={
          <ProtectedRoute>
            <EditWorkPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
