import './App.css';
import {useState} from "react";

export default function App() {
    const [tasks, setTasks] = useState([])
    const [taskInput, setTaskInput] = useState("")

    const addTask = () => {
        if (taskInput.trim() === "") return;

        const newTask = {
            id: Date.now(),
            text: taskInput,
            done: false,
        };

        setTasks([...tasks, newTask]);
        setTaskInput("");
    };


    const deleteTodo = (id) => {
        setTasks(tasks.filter((todo) => todo.id !== id))
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addTask()
        }
    };

    const totalCount = tasks.length;
    const completedCount = tasks.filter((task) => task.done).length;

    const toggleTodo = (id) => {
        setTasks(tasks.map((task) => (task.id === id ? {...task, done: !task.done} : task)))
    };


    return (
        <div className="app">
            <div className="app-container">
                <div className="app-header">
                    <h1 className="app-title">My Tasks</h1>
                    <p className="app-subtitle">Stay organized, stay focused</p>
                </div>

                {/* Add Todo Input */}
                <div className="todo-card">
                    <div className="todo-card-content">
                        <div className="todo-input-container">
                            <input
                                className="todo-input"
                                type="text"
                                placeholder="Add a new task..."
                                value={taskInput}
                                onChange={(e) => setTaskInput(e.target.value)}
                                onKeyUp={handleKeyPress}/>

                            <button
                                className="todo-button"
                                onClick={addTask}>
                                <svg className="icon" viewBox="0 0 24 24">
                                    <path d="M12 5v14M5 12h14"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/*Progress Indicator*/}
                {totalCount > 0 && (
                    <div className="todo-progress">
                        <div className="todo-progress-badge">
                            <span>
                                {completedCount} of {totalCount} completed
                            </span>
                        </div>
                    </div>
                )}

                {/* Todo List */}
                <div className="todo-list">
                    {tasks.length === 0 ? (
                        <div className="todo-card">
                            <div className="todo-card-content">
                                <div className="todo-empty">
                                    <p>No tasks yet. Add one above to get started!</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div key={task.id} className="todo-card">
                                <div className="todo-card-content">
                                    <div className="todo-item">
                                        <div className={`todo-checkbox ${task.done ? "checked" : ""}`}
                                             onClick={() => toggleTodo(task.id)}
                                        />
                                        <span className={`todo-text ${task.done ? "completed" : ""}`}>
                                            {task.text}
                                        </span>
                                        <button onClick={() => deleteTodo(task.id)} className="todo-delete-button">
                                            <svg className="icon" viewBox="0 0 24 24">
                                                <path
                                                    d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM10 11v6M14 11v6"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )))
                    }
                </div>

                {/* Footer */}

                <div className="todo-footer">
                    <p>Built with care for your productivity</p>
                </div>
            </div>
        </div>
    )
}
