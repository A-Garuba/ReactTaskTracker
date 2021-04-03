import PropTypes from 'prop-types'

// Button component receives color and text parameters to display
// onClick function is delegated to parent

const Button = ({color, text, onClick}) => {
	return (
		<button onClick={onClick} style={{backgroundColor: color}} className='btn'>
			{text}
		</button>
	)
}

Button.defaultProps = {
	color: 'steelblue',
}

Button.propTypes = {
	text: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
}

export default Button
