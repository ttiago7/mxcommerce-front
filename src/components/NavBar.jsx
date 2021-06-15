import React from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
	const history = useHistory();

	const buscar = (path) => {
		history.push(path);
	};

	return (
		<Navbar bg='primary' variant='dark'>
			<Navbar.Brand href='/'>Home</Navbar.Brand>
			<Nav className='mr-auto'>
				<Nav.Link href='http://localhost:3000/newProduct/nuevo'>
					Create product
				</Nav.Link>
			</Nav>
		</Navbar>
	);
};
export default NavBar;
