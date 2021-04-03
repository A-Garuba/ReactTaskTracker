import {useState} from 'react'

// AddTask component handles form submission for adding a task
// component-state: text, day, and reminder
// 		^updated in real-time (pre-submit)

const AddTask = ({onAdd}) => {
	const [text, setText] = useState('')
	const [day, setDay] = useState('')
	const [reminder, setReminder] = useState(false)

	/**
	 * This function handles the form's onSubmit event.
	 * Passes component-state information up to App (onAdd) and resets state
	 */
	const formSubmit = (e) => {
		e.preventDefault()

		if (!text) {
			alert('Please add a task')
			return
		}

		onAdd({text, day, reminder})

		setText('')
		setDay('')
		setReminder(false)
	}

	return (
		<form className='add-form' onSubmit={formSubmit}>
			<div className='form-control'>
				<label>Task</label>
				<input
					type='text'
					placeholder='Add Task'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
			</div>
			<div className='form-control'>
				<label>Day & Time</label>
				<input
					type='text'
					placeholder='Add Day & Time'
					value={day}
					onChange={(e) => setDay(e.target.value)}
				/>
			</div>
			<div className='form-control form-control-check'>
				<label>Set Reminder</label>
				<input
					type='checkbox'
					checked={reminder}
					value={reminder}
					onChange={(e) => setReminder(e.currentTarget.checked)}
				/>
			</div>

			<input type='submit' value='Add Task' className='btn btn-block' />
		</form>
	)
}

export default AddTask
