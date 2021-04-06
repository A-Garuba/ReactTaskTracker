import {useState} from 'react'

// AddTask component handles form submission for adding a task
// component-state: text, date, and reminder
// 		^updated in real-time (pre-submit)

const AddTask = ({onAdd}) => {
	// store today's date yyyy-mm-dd
	const x = new Date()
	const TODAY = x.toISOString().split('T')[0]

	// Form's state variables
	const [text, setFormText] = useState('')
	const [date, setFormDate] = useState(TODAY)

	const [reminder, setFormReminder] = useState(false)

	/**
	 * This function handles the form's onSubmit event.
	 * Passes component-state information up to App (onAdd) and resets state
	 */
	const formSubmit = (e) => {
		e.preventDefault()

		onAdd({text, date, reminder})

		setFormText('')
		setFormDate(TODAY)
		setFormReminder(false)
	}

	return (
		<form className='add-form' onSubmit={formSubmit}>
			<div className='form-control'>
				<label>Task</label>
				<input
					type='text'
					placeholder='Add Task'
					value={text}
					onChange={(e) => setFormText(e.target.value)}
					required
				/>
			</div>
			<div className='form-control'>
				<label>Date</label>
				<input
					type='date'
					value={date}
					min={TODAY}
					onChange={(e) => setFormDate(e.target.value)}
					required
				/>
			</div>
			<div className='form-control form-control-check'>
				<label>Set Reminder</label>
				<input
					type='checkbox'
					checked={reminder}
					value={reminder}
					onChange={(e) => setFormReminder(e.currentTarget.checked)}
				/>
			</div>

			<input type='submit' value='Add Task' className='btn btn-block' />
		</form>
	)
}

export default AddTask
