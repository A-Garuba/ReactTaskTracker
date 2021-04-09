import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import {Header, Footer, About, Tasks, AddTask} from './components/compindex'

/**
 * App runs Task Tracker and contains all of the applications components/logic
 * The tasks are loaded from json-server (db.json) and displayed to the UI.
 * User requests are sent to server, UI updated with response
 *
 * State: Tasks from server, boolean for Header's Add button
 *
 * Returns application's main JSX for the homepage
 */

const App = () => {
	const [showAddTask, setShowAddTask] = useState(false)
	const [tasks, setTasks] = useState([])

	// initially load Tasks from server
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
		var data = await res.json()

		//Retrieve in chronological order
		if (data.length > 1) {
			var fetchedTasks = [],
				lowestDate = '',
				lowestDateID = '',
				currentDate = '',
				i = ''

			while (data.length > 0) {
				lowestDate = new Date(data[0].date)
				lowestDateID = data[0].id

				for (i = 1; i < data.length; i++) {
					currentDate = new Date(data[i].date)

					if (lowestDate.getTime() > currentDate.getTime()) {
						lowestDate = currentDate
						lowestDateID = data[i].id
					}
				}
				//Add next chronological task to returned array
				fetchedTasks.push(await fetchTask(lowestDateID))
				//remove this task from database copy
				data = data.filter((task) => {
					return task.id !== lowestDateID
				})
			}

			return fetchedTasks
		} else {
			return data
		}
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
	 * This function sends a POST request containing a Task object to the
	 * server. Then, it updates the UI task array with a brute force
	 * chronological insertion.
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

		//Insert in chronological order
		var insertDate = new Date(data.date)
		var arrDate = ''
		var i = 0

		while (i < tasks.length) {
			arrDate = new Date(tasks[i].date)
			if (insertDate.getTime() < arrDate.getTime()) {
				break
			}
			i++
		}

		tasks.splice(i, 0, data)
		setTasks([...tasks])

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
	 * Toggle Priority
	 *
	 * This function sends a PUT request to toggle the priority field of the
	 * specified task ID to the server. Then, it updates the UI with the
	 * response.
	 * Input: Task ID
	 */
	const togglePriority = async (id) => {
		const taskToToggle = await fetchTask(id)
		const updTask = {...taskToToggle, priority: !taskToToggle.priority}

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
				task.id === id ? {...task, priority: data.priority} : task
			)
		)
	}

	/*** Main JSX for application ***/

	//Displays components: Header, Tasks, and Footer. The Header and Tasks toggle with About page
	return (
		<Router>
			<div className='container'>
				<Header
					onAdd={() => setShowAddTask(!showAddTask)}
					showAdd={showAddTask}
				/>
				<Route
					path='/'
					exact
					render={(props) => (
						<>
							{showAddTask && <AddTask onAdd={addTask} />}
							{tasks.length > 0 ? (
								<Tasks
									tasks={tasks}
									onDelete={deleteTask}
									onToggle={togglePriority}
								/>
							) : (
								'No Tasks To Show'
							)}
						</>
					)}
				/>
				<Route path='/about' component={About} />
				<Footer />
			</div>
		</Router>
	)
}

export default App
