import { TaskRow } from "./TaskRow";

export const TaskTable = ({ task, toggleTask, showCompeted = false }) => {
  const taskTableRows = (doneValue) => {
    return task
      .filter((task) => task.done === doneValue)
      .map((task) => (
        <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
      ));
  };

  return (
    <>
      <table className="table table-dark table-striped table-bordered border-secondary">
        <thead>
          <tr className="table-primary">
            <th>Task</th>
          </tr>
        </thead>
        <tbody>{taskTableRows(showCompeted)}</tbody>
      </table>
    </>
  );
};
