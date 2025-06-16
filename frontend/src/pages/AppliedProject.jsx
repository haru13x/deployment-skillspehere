import React, { useEffect, useState } from "react";
import Topbar from "../components/Navigation/Topbar";
import TaskList from "../components/Task/TaskList";
import { UseMethods } from "../composable/UseMethods";

const AppliedProject = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await UseMethods("get", "get-applied-project");
      if (res) {
        setTasks(res.data.data);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <Topbar />
      <TaskList tasks={tasks} loading={loading} />
    </div>
  );
};

export default AppliedProject;
