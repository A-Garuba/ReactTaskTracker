import {FaTimes} from 'react-icons/fa'

/**
 * Task component handles displaying each task.
 * onDelete handles user deleting task
 * onToggle handles user setting/removing priority on task
 */

const Task = ({task, onDelete, onToggle}) => {
	const options = {
		weekday: 'long',
		//year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	return (
		<div
			className={`task ${task.priority ? 'priority' : ''}`}
			onDoubleClick={() => onToggle(task.id)}
		>
			<h3>
				{task.text}
				<FaTimes
					style={{color: 'red', cursor: 'pointer'}}
					onClick={() => onDelete(task.id)}
				/>
			</h3>
			<p>
				{new Date(task.date + 'T00:00:00').toLocaleDateString(
					undefined,
					options
				)}
			</p>
		</div>
	)
}

export default Task
