import {useState} from 'react'

// AddTask component handles form submission for adding a task
// component-state: text, date, and priority
// 		^updated in real-time (pre-submit)

const AddTask = ({onAdd}) => {
	// store today's date yyyy-mm-dd
	var x = new Date(),
		month = '' + (x.getMonth() + 1),
		day = '' + x.getDate(),
		year = x.getFullYear()

	if (month.length < 2) month = '0' + month
	if (day.length < 2) day = '0' + day

	const TODAY = [year, month, day].join('-')

	// Form's state variables
	const [text, setFormText] = useState('')
	const [date, setFormDate] = useState(TODAY)
	const [priority, setFormPriority] = useState(false)

	/**
	 * This function handles the form's onSubmit event.
	 * Passes component-state information up to App (onAdd) and resets state
	 */
	const formSubmit = (e) => {
		e.preventDefault()

		onAdd({text, date, priority})

		setFormText('')
		setFormPriority(false)
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
				<label>Set Priority</label>
				<input
					type='checkbox'
					checked={priority}
					value={priority}
					onChange={(e) => setFormPriority(e.currentTarget.checked)}
				/>
			</div>

			<input type='submit' value='Add Task' className='btn btn-block' />
		</form>
	)
}

export default AddTask
