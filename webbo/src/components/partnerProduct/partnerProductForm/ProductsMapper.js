import React, {useState, useEffect} from "react";
import GetProducts from "../apiRequests/GetProducts";
import Product from "./Product";
import useStyles from "./Styles";
import GetPartnerProducts from "../apiRequests/GetPartnerProducts";

/**
 * @param {int} partnerId
 * @returns 
 */
const ProductsMapper=(props)=>{
	
	const [products, setProducts] = useState([]);
	const [existingProducts, setExistingProducts] = useState([]);
	
	const classes=useStyles();
	
	useEffect(() => {
		productsGetter();
	}, []);
	
	useEffect(()=>{
		existingProductsGetter();
	}, [props.partnerId]);
	
	async function productsGetter() {
		let data = await GetProducts();
		setProducts(data);
	}
	
	async function existingProductsGetter(){
		let data=await GetPartnerProducts(props.partnerId);
		setExistingProducts(data);
	}
	
	// console.log("products: ", products);
	// console.log("partnerProducts:", existingProducts);
	return(
		<div className={classes.productList}>
			{products.map((item)=>(
				<Product 
					key={item.id} 
					id={item.id} 
					name={item.name} 
					partnerId={props.partnerId} 
					existingProducts={existingProducts}
				/>
			))}
		</div>
	);
}

export default ProductsMapper;