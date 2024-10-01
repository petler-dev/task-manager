import React, { useState, useEffect } from 'react';
import { ref, onValue, push, update, remove } from 'firebase/database';  // Импортируем необходимые методы
import { database } from './firebase';  // Импортируем базу данных
import './styles/App.scss';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  // Получаем список задач из базы данных
  useEffect(() => {
    const taskRef = ref(database, 'Tasks');
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      const taskList = [];
      for (let id in data) {
        taskList.push({ id, ...data[id] });
      }
      setTasks(taskList);
    });
  }, []);

  // Добавляем новую задачу
  const addTask = () => {
    const taskRef = ref(database, 'Tasks');
    const newTask = { task, completed: false };
    push(taskRef, newTask);
    setTask('');
  };

  // Обновляем состояние задачи (выполнено/не выполнено)
  const toggleComplete = (taskId) => {
    const taskRef = ref(database, `Tasks/${taskId}`);
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    update(taskRef, { completed: !taskToUpdate.completed });
  };

  // Удаляем задачу
  const deleteTask = (taskId) => {
    const taskRef = ref(database, `Tasks/${taskId}`);
    remove(taskRef);
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {task.task}
            <div className="actions">
              <button onClick={() => toggleComplete(task.id)}>Complete</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
