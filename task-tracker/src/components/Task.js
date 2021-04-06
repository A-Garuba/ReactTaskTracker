import {FaTimes} from 'react-icons/fa'

/**
 * Task component handles displaying each task.
 * onDelete handles user deleting task
 * onToggle handles user setting/removing reminder on task
 */

const Task = ({task, onDelete, onToggle}) => {
	return (
		<div
			className={`task ${task.reminder ? 'reminder' : ''}`}
			onDoubleClick={() => onToggle(task.id)}
		>
			<h3>
				{task.text}
				<FaTimes
					style={{color: 'red', cursor: 'pointer'}}
					onClick={() => onDelete(task.id)}
				/>
			</h3>
			<p>{new Date(task.date).toDateString()}</p>
		</div>
	)
}

export default Task
