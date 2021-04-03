import {Link} from 'react-router-dom'

// About component displays version and a route to return to home

const About = () => {
	return (
		<div>
			<h4>Version 1.0.0</h4>
			<Link to='/'>Go Back</Link>
		</div>
	)
}

export default About
