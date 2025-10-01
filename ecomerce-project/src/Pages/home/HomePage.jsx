import axios from 'axios';
import { useEffect,useState } from 'react';
import { Header } from '../../components/Header';
import './HomePage.css';
import { ProductsGrid } from './ProductsGrid';


export function HomePage({cart}) {

  const [products,setProducts] =useState([]);


  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        console.log("Product response : ",response.data);
        setProducts(response.data);
      });


  },[]);



  return (
    <>
      <Header cart={cart}/>

      <title>Home Page</title>

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}