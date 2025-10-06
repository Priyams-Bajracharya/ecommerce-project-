import { Header } from '../../components/Header';
import './TrackingPage.css'
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';



export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  console.log(orderId, productId);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
    const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }
    
    fetchTrackingData();

  }, [orderId])



  if (!order) {
    return null;
  }
  const productItem = order.products.find((product)=> product.productId === productId)

  const totalDeliveryTimeMs= productItem.estimatedDeliveryTimeMs-order.orderTimeMs;//calculate total delivery time 

  const timePassedMs =dayjs().valueOf() -order.orderTimeMs; //calculate how much time has passed

 const deliverPercent = totalDeliveryTimeMs > 0 
  ? Math.min(100, Math.max(0, (timePassedMs / totalDeliveryTimeMs) * 100))
  : 0;


  return (
    <>
      <title>Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">
            Arriving on {dayjs(productItem.estimatedDeliveryTimeMs).format('dddd ,MMMM D')}
          </div>

          <div className="product-info">
            {productItem.product.name}
          </div>

          <div className="product-info">
            Quantity: {productItem.quantity}
          </div>

          <img className="product-image" src={productItem.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">
              Preparing
            </div>
            <div className="progress-label current-status">
              Shipped
            </div>
            <div className="progress-label">
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliverPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}