import React, { useEffect, useState } from "react";
import Topbar from "../components/Navigation/Topbar";

import ProjectTaskList from "../components/Task/ProjectTaskList";

import { UseMethods } from "../composable/UseMethods";

const ProjectPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await UseMethods("get", "get-my-project");
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
      <ProjectTaskList tasks={tasks} loading={loading} />
    </div>
  );
};

export default ProjectPage;
