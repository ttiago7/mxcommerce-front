import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const GraphicPopUp = (props) => {
	console.log('3 - graphic pop up component');
	const product = props.product;
	//const dispatch = useDispatch();

	const [show, setShow] = useState(true);
	const close = () => {
		props.onChange(false);
		setShow(false);
	};

	useEffect(() => {
		//dispatch(getLastRatesQuantity(props.idCurrency, props.quantity));
	}, []);

	return (
		<Modal show={show} onHide={close}>
			<Modal.Header>
				<Modal.Title>Detalles de {product.titulo}</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<h6>Código de producto:</h6>
				<p>{product.codigo}</p>
				<h6>Descripción corta:</h6>
				<p>{product.descripcionCorta}</p>
				<h6>Descripción larga: </h6>
				<p>{product.descripcionLarga}</p>
				<h6>Ubicación: </h6>
				<p>{product.ubicacion}</p>
				<h6>Precio: </h6>
				<p>{product.precio}</p>
				<h6>Stock: </h6>
				<p>{product.stock}</p>
				<h6>C.P.: </h6>
				<p>{product.cp}</p>
				<h6>Latitud y Longitud </h6>
				<p>
					Lat.: {product.latitud} - Lon.: {product.longitud}
				</p>
				<h6>URL de imagen: </h6>
				<p>{product.urlImagen}</p>
			</Modal.Body>

			<Modal.Footer>
				<Button variant='secondary' onClick={close}>
					Cerrar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
export default GraphicPopUp;
