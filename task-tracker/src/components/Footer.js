import {Link} from 'react-router-dom'

// Footer component displayed at bottom of the page,
// Contains simple route to About page with a return route

const Footer = () => {
	return (
		<footer>
			<p>Copyright &copy; 2021</p>
			<Link to='/about'>About</Link>
		</footer>
	)
}

export default Footer
