import {useState} from 'react'

// AddTask component handles form submission for adding a task
// component-state: text, date, and reminder
// 		^updated in real-time (pre-submit)

const AddTask = ({onAdd}) => {
	var x = new Date()
	x.setDate(x.getDate() - 1)
	const TODAY = x.toISOString().split('T')[0]

	// Form's state variables
	const [text, setText] = useState('')
	const [date, setDate] = useState(TODAY)

	const [reminder, setReminder] = useState(false)

	/**
	 * This function handles the form's onSubmit event.
	 * Passes component-state information up to App (onAdd) and resets state
	 */
	const formSubmit = (e) => {
		e.preventDefault()

		onAdd({text, date, reminder})

		setText('')
		setDate(TODAY)
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
					required
				/>
			</div>
			<div className='form-control'>
				<label>Date</label>
				<input
					type='date'
					value={date}
					min={TODAY}
					onChange={(e) => setDate(e.target.value)}
					required
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
