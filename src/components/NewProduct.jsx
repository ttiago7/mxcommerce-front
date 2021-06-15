import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Form, Button, Modal, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postProduct, getProductByCodigo } from '../redux/productDucks';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

//https://drive.google.com/uc?id=19tBVIdoPYxxZjHDGaBd7RnlaeuWJ9k2e
//https://drive.google.com/uc?id=11sgeJFeL1kBzd2ZM8Sxh5Nd8gt0Ep2Ux
//https://drive.google.com/uc?id=1eun_BxjnWwBtAzVG6Gw5rjhZBFz4cjkc

const NewProduct = ({ codigo }) => {
	console.log('5 - New Product component ' + codigo);
	const dispatch = useDispatch();
	// const productEdit = useSelector((store) => store.product.product);
	const history = useHistory();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setValue,
	} = useForm();
	// const { register, handleSubmit, reset, errors } = useForm();

	useEffect(() => {
		if (codigo !== 'nuevo') {
			//producto.codigo = codigo;
			dispatch(getProductByCodigo(codigo)).then((res) => {
				//cargar los datos
				console.log(res);
				setValue('titulo', res.titulo, {
					shouldValidate: true,
				});
				setValue('descripcionCorta', res.descripcionCorta, {
					shouldValidate: true,
				});
				setValue('descripcionLarga', res.descripcionLarga, {
					shouldValidate: true,
				});
				setValue('ubicacion', res.ubicacion, {
					shouldValidate: true,
				});
				setValue('precio', res.precio, {
					shouldValidate: true,
				});
				setValue('stock', res.stock, {
					shouldValidate: true,
				});
				setValue('cp', res.cp, {
					shouldValidate: true,
				});
				setValue('latitud', res.latitud, {
					shouldValidate: true,
				});
				setValue('longitud', res.longitud, {
					shouldValidate: true,
				});
				setValue('urlImagen', res.urlImagen, {
					shouldValidate: true,
				});
			});
		}
	}, [codigo]);

	const onSubmit = (data, e) => {
		let producto = {
			titulo: data.titulo,
			descripcionCorta: data.descripcionCorta,
			descripcionLarga: data.descripcionLarga,
			ubicacion: data.ubicacion,
			precio: data.precio,
			stock: data.stock,
			cp: data.cp,
			latitud: data.latitud,
			longitud: data.longitud,
			urlImagen: data.urlImagen,
		};
		if (codigo !== 'nuevo') {
			producto.codigo = codigo;
		}
		dispatch(postProduct(producto)).then((res) => {
			//redireccionar al home
			let path = `/`;
			history.push(path);
		});
		e.target.reset(); // reset after form submit
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Modal.Body>
				<h2>Form to create a new post</h2>
				<hr></hr>
				<input
					placeholder='Ingrese el titulo'
					className='form-control mb-2'
					name='titulo'
					type='text'
					{...register('titulo', {
						required: {
							value: true,
							message: 'titulo es requerido',
						},
						maxLength: {
							value: 180,
							message: 'maximo 180 caracteres',
						},
					})}
				></input>

				<input
					placeholder='Ingrese la descripción corta'
					className='form-control mb-2'
					name='descripcionCorta'
					type='textarea'
					{...register('descripcionCorta', {
						required: {
							value: true,
							message: 'Descripción corta es requerido',
						},
					})}
				></input>
				<input
					placeholder='Ingrese la descripción larga'
					className='form-control mb-2'
					name='descripcionLarga'
					type='textarea'
					{...register('descripcionLarga', {
						required: {
							value: true,
							message: 'Descripción larga es requerido',
						},
					})}
				></input>
				<input
					placeholder='Ingrese la ubicación'
					className='form-control mb-2'
					name='ubicacion'
					type='text'
					{...register('ubicacion', {
						required: {
							value: true,
							message: 'ubicación es requerido',
						},
					})}
				></input>
				<input
					placeholder='Ingrese el precio del producto'
					className='form-control mb-2'
					name='precio'
					type='number'
					{...register('precio', {
						required: {
							value: true,
							message: 'Precio del producto es requerido',
						},
						maxLength: {
							value: 11,
							message: 'Max of 11 characters',
						},
						minLength: {
							value: 1,
							message: 'Min of 1 characters',
						},
						validate: {
							positiveNumber: (value) => parseFloat(value) > 0,
							lessThanHundred: (value) =>
								parseFloat(value) < 99999999999,
						},
					})}
				></input>
				<input
					placeholder='Ingrese el stock'
					className='form-control mb-2'
					name='stock'
					type='number'
					{...register('stock', {
						maxLength: {
							value: 11,
							message: 'Max of 11 characters',
						},
						minLength: {
							value: 1,
							message: 'Min of 1 characters',
						},
						validate: {
							positiveNumber: (value) => parseFloat(value) > 0,
							lessThanHundred: (value) =>
								parseFloat(value) < 99999999999,
						},
					})}
				></input>
				<input
					placeholder='Ingrese el C.P.'
					className='form-control mb-2'
					name='cp'
					type='text'
					{...register('cp', {})}
				></input>
				<input
					placeholder='Ingrese la latitud'
					className='form-control mb-2'
					name='latitud'
					type='number'
					{...register('latitud', {})}
				></input>
				<input
					placeholder='Ingrese la longitud'
					className='form-control mb-2'
					name='longitud'
					type='number'
					{...register('longitud', {})}
				></input>
				<input
					placeholder='Ingrese la URl de la imagen'
					className='form-control mb-2'
					name='urlImagen'
					type='text'
					{...register('urlImagen', {})}
				></input>

				{errors.value && (
					<span className='text-danger text-small d-block mb-2'>
						{errors.value.message}
					</span>
				)}

				{errors.value && errors.value.type === 'positiveNumber' && (
					<span className='text-danger text-small d-block mb-2'>
						Your value is invalid
					</span>
				)}
				{errors.value && errors.value.type === 'lessThanHundred' && (
					<span className='text-danger text-small d-block mb-2'>
						Your value should be greater than 99999999999
					</span>
				)}
			</Modal.Body>

			<Modal.Footer>
				<Button type='reset' variant='secondary'>
					Standard Reset Field Values
				</Button>
				<Button type='submit' className='btn btn-primary'>
					Save
				</Button>
			</Modal.Footer>
		</Form>
	);
};
export default NewProduct;
