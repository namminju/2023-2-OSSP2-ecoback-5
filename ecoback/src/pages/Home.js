import React from 'react';
import '../css/Home.css';
const Home = () => {
  return (
    <div>
    <div className="normal" id="normalline" style={{ padding: '5px 7px' }}>
      <div className="title">Eco$Back</div>
      <div id="menubar_array">    

        <line/><line/><line/>
      </div>
    </div>

    <img
      src={require('../image/adv2.png')} // Make sure to provide the correct image path
      alt="adver"
      className="banner" // Modify class name as needed
    />

    <div className="normal" id="normalline">
      <div className="normal">내 잔여 포인트</div>
      <div className="normal">1,234 포인트</div>
    </div>

    <div id="boxline" className="normal">
      <div className="box">
        <img
          src={require('../image/receipticon.png')} // Modify image path
          alt="receipt"
          style={{ width: '45px', height: '36px' }}
        />
        <div>영수증 촬영</div>
      </div>
      <div className="box">
        <img
          src={require('../image/storeicon.png')} // Modify image path
          alt="store"
          style={{ width: '36px', height: '36px' }}
          
        />
        <div>포인트 상점</div>
      </div>
    </div>

    <hr />

    <div className="normal"style={{ padding: '15px 10px' }}>
      오늘 절약한 일회용품
    </div>

    <div style={{ padding: '10px 0 110px 0' }}>
      <div style={{ padding: '0 0 0 52%' }}>
        <div className="image-container">
          <img
            src={require('../image/speechbubble.png')}
            alt="receipt"
            style={{ width: '70px', height: '60px', margin:'0' }}
        />
        <div className="image-text">&nbsp;조금만 더...!</div>
        </div>
      </div>
      <div id="turtlebar"> {/* Modify class name */}
        <img
          src={require('../image/free-icon-juice.png')} // Modify image path
          alt="juice"
          style={{ width: '40px', height: '40px', margin: '0px' }}
        />
        <img
          src={require('../image/free-icon-turtle.png')} // Modify image path
          alt="turtle"
          style={{ width: '50px', height: '30px', margin: '0px' }}
        />
        <img
          src={require('../image/free-icon-paper-cup.png')} // Modify image path
          alt="paper-cup"
          style={{ width: '36px', height: '36px', margin: '0px' }}
        />
      </div>
      <div className="center-hr">
        <hr className="hr" />
      </div>
      <div className="center-hr">
        <div class="normal">일회용 컵 123,456개 절약 중</div>
      </div>
    </div>

    </div>
      );
};

export default Home;