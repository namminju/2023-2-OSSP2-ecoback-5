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
        <img id="logo" src={logo} alt="logo" style={{padding:'0'}} />
        <img id="iphone" src={iphone} alt="iphone" />
        <Link to="/login">
          <img id="logintostart" src={logintostart} alt="Go to Login" />
        </Link>
      </center>
    </div>
  );
}

export default Start;