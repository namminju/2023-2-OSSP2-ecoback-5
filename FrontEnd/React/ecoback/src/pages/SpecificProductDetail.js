// Product.jsx
import React, { useState, useEffect } from 'react';
import '../css/Product.css'; 
import TitleBanner from '../components/TitleBanner';
import BuyingPopup from './BuyingPopup';
import BackbuttonBar from '../components/BackbuttonBar';
import API from 'api/axios';
import { useLocation } from 'react-router-dom';
import StorePointDisappear from '../components/StorePointDisappear';
import { Link, useNavigate } from 'react-router-dom';

const Product = () => {
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const navigate = useNavigate();
  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    const access_token = localStorage.getItem('access');
    try {
      const response = await API.get(`/market/products/${id}/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setProduct(response.data);
    } catch (e) {
      console.log('API 오류: ', e);
      navigate('/');
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <div className="full_container" style={{minHeight:'100vh'}}>
      <div style={{ flex:'1'}}>
        <TitleBanner />
        <hr />
        <BackbuttonBar title="개별 상품 페이지" />
        <hr />
        <div className="productBox">
          <div className="Item">
            <img 
            style={{position: 'absolute', margin:'0', width: '80%', maxHeight:'80%' , objectFit: 'cover'}}
            id="itemImg" src={product.product_image} alt={product.name} />
          </div>
          <div className="pricetag">
            <div id="productname" style={{ fontSize: '20px' }}>{product.name}<br /></div>
            <div style={{ fontSize: '25px' }}><b>{product.price} 원</b></div>
          </div>
        </div>
      </div>
      <br/><br/>
      <StorePointDisappear />
      <div className="btnBox">
        <button id="buyBtn" onClick={handleOpenModal}>
          <b style={{ fontSize: '15px' }}>구매하기</b>
        </button>
        <BuyingPopup productId={id} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} price={product.price} />
      </div>
    </div>
  );
};

export default Product;
