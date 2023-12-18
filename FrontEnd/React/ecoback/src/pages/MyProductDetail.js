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
  }, [id]);

  const fetchProductData = async () => {
    const access_token = localStorage.getItem('access');
    try {
      const response = await API.get(`/mypage/my_products/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setProduct(response.data);
    // 'id'와 일치하는 상품만 필터링
    const matchingProduct = response.data.find(product => product.id === Number(id));

    if (matchingProduct) {
      setProduct(matchingProduct);
    } else {
      console.log('상품을 찾을 수 없음');
      // 상품을 찾을 수 없을 때의 처리 추가
      navigate('/');
    }
  } 
    
    catch (e) {
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
        <BackbuttonBar title="구매 상품 사용" />
        <hr />
        <div className="productBox">
          <div className="Item">
            <img 
            style={{position: 'absolute', margin:'0', width: '80%', maxHeight:'80%' , objectFit: 'cover'}}
            id="itemImg" src={API.defaults.baseURL+product.product_image} alt={product.name} />
          </div>
        <div className="pricetag">
            <div id="productname" style={{ fontSize: '20px' }}>{product.name}<br /></div>
        </div>
        <div className="barcode2">
            <img 
            className='barcodeimage'
            src={require('../image/buyingb.png')} />
        </div>
        </div>
      </div>
      <br/><br/>
      <div>
        <StorePointDisappear />
      </div>
      
    </div>
  );
};

export default Product;
