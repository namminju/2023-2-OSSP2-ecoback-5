// 필요한 모듈을 import 합니다.
import React from 'react';
import { Link } from 'react-router-dom'; // 페이지 이동을 위한 Link 컴포넌트
import logintostart from '../image/logintostart.png'; // 이미지 import
import logo from '../image/logo.png'; // 로고 이미지 경로
import iphone from '../image/iphone.png'; // 로고 이미지 경로
import '../css/Start.css'; // 스타일 파일 경로

function Start() {
  return (
    <div className="full_container">
      <center>
        <div id="logo">
                <img id="logo" src={logo} alt="logo" />
                일회용컵으로 힘들어 하고 있는 바다거북이를 지켜주세요!
            </div>
        <img id="iphone" src={iphone} alt="iphone" />
        <Link to="/login">
          <img id="logintostart" src={logintostart} alt="Go to Login" />
        </Link>
      </center>
    </div>
  );
}

export default Start;