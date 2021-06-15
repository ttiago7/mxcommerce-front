import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { deleteProduct } from '../redux/productDucks.js';
import DetallesPopUp from './DetallesPopUp';
import NewProduct from './NewProduct';
import sinImagen from '../images/sinImagen.jpg';

export default function ProductCard({ product }) {
	const dispatch = useDispatch();
	const history = useHistory();
	console.log('2 - crypto card component');

	var [detalles, setDetalles] = useState(false);
	const detallesPopUp = () => {
		setDetalles(true);
	};

	var [editar, setEditar] = useState(false);

	const eliminarProduct = (codigo) => {
		dispatch(deleteProduct(codigo)).then((res) => {
			//redireccionar al home
			let path = `/`;
			history.push(path);
		});
	};

	useEffect(() => {
		console.log('llamando nuevamente ');
		//dispatch(getLastRates());
	}, []);

	const switchImg = () => {
		if (product.urlImagen) {
			console.log('tiene imagen');
			return product.urlImagen;
		} else {
			console.log('no tiene imagen');
			return sinImagen;
		}
	};

	return (
		<div className='mx-4 my-4'>
			<Card style={{ width: '18rem' }} className='text-center'>
				<Card.Img
					variant='top'
					src={switchImg()}
					// src={
					// 	{
					// 		bitcoin: bitcoin,
					// 		ethereum: ethereum,
					// 		cardano: cardano,
					// 		default: monedas,
					// 	}[rate.description]
					// }
				/>
				{/* 100x180 */}
				<Card.Body>
					<Card.Title>
						{product.titulo} - ${product.precio}
					</Card.Title>

					<Card.Text>
						Ubicación {product.ubicacion}, creado el{' '}
						{/* {rate.created_at} */}
						{moment(product.createdAt).format(
							'DD MMMM yyyy HH:mm:ss'
						)}
					</Card.Text>
				</Card.Body>
				<ListGroup className='list-group-flush'>
					<ListGroupItem>
						<Card.Link href='#'>
							<Button
								id='c'
								onClick={() => {
									detallesPopUp();
								}}
								variant='link'
							>
								Ver detalles
							</Button>
						</Card.Link>
					</ListGroupItem>
					<ListGroupItem>
						<Card.Link
							href={`http://localhost:3000/newProduct/${product.codigo}`}
						>
							Editar
						</Card.Link>
					</ListGroupItem>
					{detalles ? (
						<DetallesPopUp
							onChange={setDetalles}
							product={product}
						/>
					) : null}
					{editar ? (
						<NewProduct
						// onChange={setDetalles}
						// product={product}
						/>
					) : null}
				</ListGroup>
				<Card.Footer className='text-muted'>
					<Card.Link href='#'>
						<Button
							id='t'
							onClick={() => eliminarProduct(product.codigo)}
							variant='link'
						>
							Eliminar
						</Button>
					</Card.Link>
				</Card.Footer>
			</Card>
		</div>
	);
}
