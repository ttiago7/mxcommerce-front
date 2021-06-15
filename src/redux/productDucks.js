import axios from 'axios';
import Swal from 'sweetalert2';

const dataInicial = {
	all: [],
	newProduct: '',
	product: {},
};

//CONSTANTES

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const POST_PRODUCT = 'POST_RATE';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';

export const postProduct = (newProduct) => async (dispatch, getState) => {
	try {
		const res = await axios.post(
			'http://localhost:8080/productos/',
			newProduct
		); //axios genera la respuesta en .data
		dispatch({
			type: POST_PRODUCT,
			payload: res.data,
		});
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Upgrade rate correctly',
			showConfirmButton: false,
			timer: 1000,
		});
		return res;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const getAllProducts = () => async (dispatch, getState) => {
	// 2 funciones de flecha x q la 1 no necesita params para ejecutarse
	//la 2 recibe dispatch para despachar la accion al reducer y getState podremos obtener la info q tenga el estado
	try {
		const res = await axios.get('http://localhost:8080/productos/all/'); //axios genera la respuesta en .data
		dispatch({
			type: GET_ALL_PRODUCTS,
			payload: res.data,
		});
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const getProductLike = (buscado) => async (dispatch, getState) => {
	// 2 funciones de flecha x q la 1 no necesita params para ejecutarse
	//la 2 recibe dispatch para despachar la accion al reducer y getState podremos obtener la info q tenga el estado
	try {
		const res = await axios.get(
			`http://localhost:8080/productos/search/${buscado}`
		); //axios genera la respuesta en .data
		dispatch({
			type: GET_ALL_PRODUCTS,
			payload: res.data,
		});
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const getProductByCodigo = (codigo) => async (dispatch, getState) => {
	// 2 funciones de flecha x q la 1 no necesita params para ejecutarse
	//la 2 recibe dispatch para despachar la accion al reducer y getState podremos obtener la info q tenga el estado
	try {
		const res = await axios.get(
			`http://localhost:8080/productos/${codigo}`
		); //axios genera la respuesta en .data
		dispatch({
			type: GET_PRODUCT_BY_ID,
			payload: res.data,
		});
		return res.data;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const deleteProduct = (codigo) => async (dispatch, getState) => {
	try {
		const res = await axios.delete(
			`http://localhost:8080/productos/${codigo}`
		); //axios genera la respuesta en .data
		dispatch({
			type: DELETE_PRODUCT,
			payload: codigo,
		});
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Deleted product correctly',
			showConfirmButton: false,
			timer: 1000,
		});
		return res.data;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

//REDUCER
export default function productReducer(state = dataInicial, action) {
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			return {
				...state,
				all: action.payload,
			};
		case GET_PRODUCT_BY_ID:
			return {
				...state,
				product: action.payload,
			};
		case POST_PRODUCT:
			return {
				...state,
				newProduct: action.payload,
			};
		case DELETE_PRODUCT:
			let codigo = action.payload;
			let index = state.all.findIndex((x) => x.codigo === codigo); // posicion del items a modificar
			if (index > -1) {
				state.all.splice(index, 1);
			}
			return {
				...state,
				// all: state,
			};
		default:
			return state;
	}
}
