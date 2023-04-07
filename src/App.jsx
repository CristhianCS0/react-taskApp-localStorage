import { useState, useEffect } from "react";
// import "./App.css";
import { TaskCreator } from "./components/TaskCreator";
import { TaskTable } from "./components/TaskTable";
import { VisibilityControl } from "./components/VisibilityControl";

function App() {
  const [taskItems, setTaskItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const createTask = (taskName) => {
    if (!taskItems.find((task) => task.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
  };

  const toggleTask = (task) => {
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  };

  const cleanTask = () => {
    setTaskItems(taskItems.filter((task) => !task.done));
    setShowCompleted(false);
  };

  useEffect(() => {
    let data = localStorage.getItem("taskItems");
    if (data) {
      setTaskItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("taskItems", JSON.stringify(taskItems));
  }, [taskItems]);

  return (
    <>
      <main className="bg-dark vh-100 text-white">
        <div className="container p-4 col-md-4 offset-md-4">
          <TaskCreator createTask={createTask} />
          <TaskTable task={taskItems} toggleTask={toggleTask} />
          <VisibilityControl
            setShowCompleted={(checked) => setShowCompleted(checked)}
            cleanTask={cleanTask}
            isChecked={showCompleted}
          />
          {showCompleted === true && (
            <TaskTable
              task={taskItems}
              toggleTask={toggleTask}
              showCompeted={showCompleted}
            />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
