import Task from './Task'

// Tasks component is a container to display the list of Task objects
// Passes function calls from Task => App

const Tasks = ({tasks, onDelete, onToggle}) => {
	return (
		<>
			Double-click: priority
			{tasks.map((task) => (
				<Task
					key={task.id}
					task={task}
					onDelete={onDelete}
					onToggle={onToggle}
				/>
			))}
		</>
	)
}

export default Tasks
