import {useState, useEffect} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
	const [showAddTask, setShowAddTask] = useState(false)
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks()
			setTasks(tasksFromServer)
		}

		getTasks()
	}, [])

	/*
	 * Fetch Tasks
	 *
	 * This function fetches all tasks from json-server
	 * Returns: Array<Task>
	 */
	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5000/tasks')
		const data = await res.json()

		return data
	}

	/*
	 * Fetch Task
	 *
	 * This function fetches a Task object from the server based on a Task ID.
	 * Input: Task ID
	 * Returns: Task Object
	 */
	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`)
		const data = await res.json()

		return data
	}

	/*
	 * Add Task
	 *
	 * This function sends a POST request containing a Task object to the server.
	 * Then, it updates the UI with the response.
	 * Input: Task object
	 */
	const addTask = async (task) => {
		const res = await fetch('http://localhost:5000/tasks', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(task),
		})

		// Update UI with response
		const data = await res.json()

		setTasks([...tasks, data])

		/*
		const id = Math.floor(Math.random() * 10000) + 1
		const newTask = {id, ...task}
		setTasks([...tasks, newTask])
    */
	}

	/*
	 * Delete Task
	 *
	 * This function sends a DELETE request with the specified Task ID
	 * to the server. Then, it updates the UI
	 * Input: Task ID
	 */
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'DELETE',
		})

		// UI
		setTasks(tasks.filter((task) => task.id !== id))
	}

	/*
	 * Toggle Reminder
	 *
	 * This function sends a PUT request to toggle the reminder field of the
	 * specified task ID to the server. Then, it updates the UI with the
	 * response.
	 * Input: Task ID
	 */
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id)
		const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(updTask),
		})

		//Update UI with response
		const data = await res.json()

		setTasks(
			tasks.map((task) =>
				task.id === id ? {...task, reminder: data.reminder} : task
			)
		)
	}

	//Main JSX for application
	return (
		<div className='container'>
			<Header
				onAdd={() => setShowAddTask(!showAddTask)}
				showAdd={showAddTask}
			/>
			{showAddTask && <AddTask onAdd={addTask} />}
			{tasks.length > 0 ? (
				<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
			) : (
				'No Tasks To Complete.'
			)}
		</div>
	)
}

export default App
