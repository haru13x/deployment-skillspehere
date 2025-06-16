import React, { useEffect, useState } from "react";


import TaskSidebar from "../components/Task/TaskSidebar";
import TaskDetail from "../components/Task/TaskDetail";
import Topbar from "../components/Navigation/Topbar.js";
import { UseMethods } from "../composable/UseMethods.js";

const TaskListPage = () => {
  const [taskData, setTaskData] = useState ([]);
  const [selectedTaskId, setSelectedTaskId] = useState(taskData[0]?.id || null);

  const handleTaskSelect = (taskId) => {
    setSelectedTaskId(taskId);
  };
  useEffect ( ()=> {
    const fetchWork = async () => {
     const res = await UseMethods("get", "get-my-task");
          if (res) {
            setTaskData(res.data.data);
      
          }
        };
        fetchWork();
 
  },
  []);

  return (
    <div style={{ backgroundColor: "#003050", height: "100%", position: "fixed", width: "100%" }}>
      <Topbar />
      <div className="flex flex-col md:flex-row" style={{ height: "100%" }}>
        <TaskSidebar tasks={taskData} onSelectTask={handleTaskSelect} />
        {selectedTaskId && <TaskDetail taskId={selectedTaskId} />}
      </div>
    </div>
  );
};

export default TaskListPage;
