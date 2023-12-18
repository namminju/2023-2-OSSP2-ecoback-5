// BuyingPopup.jsx
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import '../seulgi/popup.css';
import API from 'api/axios';
import PaymentSuccessModal from './paymentSuccess';

const BuyingPopup = ({ productId, isModalOpen, setIsModalOpen, price }) => {
  const [paymentSuccessModalOpen, setPaymentSuccessModalOpen] = useState(false);
  const access_token = localStorage.getItem('access');
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.get('/mypage/get_object/', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      
      setUserInfo(response.data);
      console.log("user 정보: ", response.data);
    } catch (e) {
      console.log("API 오류: ", e);
    }
  };

  const modalStyle = {
    content: {
      borderRadius: "20px",
      aspectRatio: '1 / 1',
      maxHeight: "40vh",
      position: 'fixed',
      width: '100%',
      maxWidth: '300px',
      margin: 0,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    console.log("차감된 포인트: ", userInfo.point);
  }

  const updatePoint = async (newPoint) => {
    try {
      {/*
      //백엔드에서 구매시 포인트가 줄어들게 구현되어 있어 해당 부분이 있을시 중복으로 포인트가 줄어드는 문제가 생겨 주석 처리
    const changePoint = await API.patch('/mypage/get_object/', {
        point: newPoint
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`
        },
      });

      setUserInfo(changePoint.data);
      console.log("Point update success: ", changePoint.data);    
    */}
      setPaymentSuccessModalOpen(true);

      const purchaseProduct = await API.post(`/market/products/${productId}/purchase/`, {
        // Include any necessary payload for the purchase
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`
        },
      });

      console.log("Product purchase success: ", purchaseProduct.data);

    } catch (e) {
      console.log("PATCH method 동작 실패: ", e);
    }

    handleCloseModal();
  }

  return (
    <div>
      <PaymentSuccessModal isModalOpen={paymentSuccessModalOpen} setIsModalOpen={setPaymentSuccessModalOpen} />
      <Modal style={modalStyle} isOpen={isModalOpen}>
        <div className="pointViewer">
          <div id="leftPoint">
            {((userInfo.point - price) >= 0) ?
            <div>
              <p style={{ fontSize: "17px" ,fontWeight:'500'}}>내 포인트 {userInfo.point}</p>
              <p style={{ fontSize: "17px",fontWeight:'500' }}>상품 가격  {price} </p>
              <p style={{ fontSize: "17px",fontWeight:'500' }}>잔여포인트  {userInfo.point - price} </p>
            </div> 
              : <div>
                <p style={{ fontSize: "23px", color: "red" ,fontWeight:'500'}}> 포인트 부족: 구매 불가 </p>
                <p style={{ fontSize: "17px", fontWeight:'500' }}>내 포인트  {userInfo.point} </p>
                <p style={{ fontSize: "17px" ,fontWeight:'500'}}>부족한 포인트  {price-userInfo.point} </p>
                </div>}
            <hr />
            <p id="sentence">
              상품을 구매하시겠습니까?<br />
              취소하기 버튼을 누르시면 <br />상품구매가 취소됩니다.</p>
          </div>
        </div>
        <hr />
        <div>
          {(userInfo.point - price) >= 0 ?
            <div>
              <button id="buy" style={{fontWeight:'500'}} onClick={() => { updatePoint(userInfo.point - price) }}>구매하기</button>
              <button id="cancel" style={{fontWeight:'500'}} onClick={handleCloseModal} >취소하기</button>
            </div>
            : <button id="close" style={{fontWeight:'500'}} onClick={handleCloseModal}>창닫기</button>}
        </div>
      </Modal>
    </div>
  )
}

export default BuyingPopup;
