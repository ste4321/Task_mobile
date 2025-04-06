import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [doneTasks, setDoneTasks] = useState([]);
  const [undoneTasks, setUndoneTasks] = useState([]);

  const markTask = (task, isDone) => {
    if (isDone) {
      setDoneTasks([...doneTasks, task]);
    } else {
      setUndoneTasks([...undoneTasks, task]);
    }
  };

  return (
    <TaskContext.Provider value={{ doneTasks, undoneTasks, markTask }}>
      {children}
    </TaskContext.Provider>
  );
};
