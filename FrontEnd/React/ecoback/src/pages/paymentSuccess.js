
import Modal from 'react-modal';
import React from 'react';
import '../seulgi/sendPhotoModal.css';
import { useNavigate } from 'react-router-dom';


const PaymentSuccessModal=({isModalOpen, setIsModalOpen})=> {
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
      padding: '5px'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    }
  };

    

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 내 교환권 페이지로 이동하는 함수
  const navigate = useNavigate();
  const goToExchangePage = () => {
     navigate('../myProduct');
  };

  return (
    <Modal style={modalStyle} isOpen={isModalOpen}>
      <div>
      <div className="pointViewer" >
        <div id="leftPoint">
          <div>
            <p style={{ fontSize: "17px" }}>감사합니다.</p>
            <p style={{ fontSize: "17px" }}>구매가 완료되었습니다.</p>
          </div> 
          <hr />
          <div id="purchase" style={{margin:'10% 0'}}>
          <p id="sentence">
            구매하신 상품은 [내 교환권]에서<br></br>
            확인하실 수 있습니다.</p>
            </div>
        </div>
      </div>
      <hr />
      <div id="btns">
        <button id="cancel" onClick={closeModal}>닫기</button>
        <button id="buy" onClick={goToExchangePage}>내 교환권</button>
      </div>
      </ div>
    </Modal>
  )
}

export default PaymentSuccessModal;
