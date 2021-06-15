import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getAllProducts } from '../redux/productDucks.js'; // obtenemos la accion obtenerCategoriasAccion exportada en ../redux/categoryDucks.js
import ProductCard from '../components/ProductCard.jsx';

function ProductContainer() {
	const dispatch = useDispatch(); // ahora con dispatch podemos ejecutar nuestras acciones

	const listOfProducts = useSelector((store) => store.product.all); //devuelve el store, uso categorys x q asi lo llame en el store, .array nos trae el array q tenemos dentro

	console.log('1 - crypto screen container');
	useEffect(() => {
		dispatch(getAllProducts());
	}, []);

	return listOfProducts ? (
		<div className='d-flex justify-content-around'>
			{/* <div className='col-md-6 mx-auto'> */}
			<div className='row'>
				{/* <div className='mx-4 my-4'> */}
				{listOfProducts.map((p) => {
					return <ProductCard product={p} key={p.codigo} />;
				})}
				{/* </div> */}
			</div>
		</div>
	) : (
		<h1>No existen publicaciones</h1>
	);
}

export default ProductContainer;
