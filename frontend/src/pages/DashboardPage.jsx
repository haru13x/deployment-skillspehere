import React, { useEffect, useState } from "react";
import Topbar from "../components/Navigation/Topbar.js";
import TaskList from "../components/Task/TaskList.js";
import axios from "axios";
import { UseMethods } from "../composable/UseMethods.js";
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await UseMethods("get", "get-tasks");
      if (res) {
        setTasks(res.data.data);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  return (
    <div className="">
      <Topbar />
      <TaskList tasks={tasks} loading={loading} />
    </div>
  );
};

export default Dashboard;
