import TitleBanner from '../components/TitleBanner.js';
import '../css/EditProfile.css';
import API from 'api/axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile=()=>{
    const navigate = useNavigate();
    const [userInfo, setUserInfo]=useState([]);
    const [selectedFile, setSelectedFile]=useState(null);
    useEffect(()=>{
        getUserData();
    },[])

    const access_token=localStorage.getItem('access');
    const endpoint='/mypage/get_object/';
    
    const getUserData=async()=>{
        try{
            const getUserInfo=await API.get(endpoint, {
                headers:{
                    Authorization:`Bearer ${access_token}`
                }
            })
            console.log("getUserInfo:", getUserInfo.data);
            setUserInfo(getUserInfo.data);

        }catch(e){
            console.log("get-API 오류: ",e);
            navigate('/');
        }
    }

    const [userData, setUserData]=useState({
        name: '',
        content:''
        
    });
    
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUserData(prevState=>({
            ...prevState,
            [name]:value
        }));
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const endpoint="/mypage/get_object/";
        const access_token=localStorage.getItem('access');
        try{
            const response=await API.patch(endpoint,userData,{
                headers:{
                    'Authorization':`Bearer ${access_token}`
                }
            });
            console.log("response.data: ",response.data);
            alert("회원정보가 변경되었습니다.");
            navigate('/mypage');

        }catch(e){
            console.log('API 오류: ',e);
        }

    }
    const formDate=(dateString)=>{
        const date=new Date(dateString);
        const year=date.getFullYear();
        const month=date.getMonth()+1;
        const day=date.getDate();
        return `${year}년 ${month}월 ${day}일`
    }
    const DefaultImageUrl="../image/defaultProfile.png"
    const handleAlbumClick = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; // 이미지 파일만 선택 가능하도록 설정
        fileInput.onchange = handleFileSelect; // 파일 선택 시 handleFileSelect 호출
        fileInput.click();
      };
      
      const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedFile(file); // selectedFile 업데이트
          console.log("File: ", file);
          await uploadFile(file); // 파일 업로드 함수 호출
        }
      };
      
      const uploadFile = async (file) => {
        const formData = new FormData();
        /*formData: image 형식으로 수정*/
        formData.append('image', file, 'profile.png'); // 선택된 파일 추가
      
        const endpoint = "/mypage/get_object/";
        const access_token = localStorage.getItem('access');
      
        try {
          /* patch 형식으로 formData 전송 */
          const response = await API.patch(endpoint, formData, {
            headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'multipart/form-data' // formData 형식으로 파일 전달
            }
          });
      
          console.log("response.data: ", response.data);
          if (response.data.image) {
            console.log("response.data",response.data);
            setUserInfo({...userInfo, image:response.data.image})
            alert("사진이 변경되었습니다.");
          }  else{
            alert("사진을 불러올 수 없습니다.");
          }
        } catch (error) {
          console.error('Error: ', error);
          alert("오류 발생");
        } 
      };
    return (
       <div>
        <div className="full_container" style={{backgroundColor:"#FFFFFF",paddingBottom:"15px", minHeight:"100vh"}}>
        <TitleBanner />

        <hr />
        <div className="profileContainer">
                <div id="username">{userInfo.name}님의 프로필</div>
                <div class="profileContent">
                    <div style={{textAlign:"center", margin:"3% 0% 0% 0%"}}>한 줄 소개</div>
                    <hr id="contentHR" />
                    <div style={{textAlign:"center", fontWeight:"bold"}}>{userInfo.content}</div>

                </div>
                <div className="faceImage" style={{marginTop:'5%', padding: 'auto'}}>
                <img id="faceImage" 
                    src={userInfo.image ? userInfo.image : require("../image/defaultProfile.png")}
                    alt="faceImg" />
                    <p style={{fontSize:"16px"}}><div>{formDate(userInfo.created_at)}부터 함께하는 중</div></p>
                    <button id="editProfile" onClick={handleAlbumClick}>사진 변경</button>
                </div>
            </div>
            <hr />
            <div className="inputBox">
                <form id="submitForm"  onSubmit={handleSubmit}>
                    <label for="name">이름</label>
                    <input id="inputs" type="text" name="name" placeholder="  이름을 입력해주세요" onChange={handleChange}/><br />
                    <label  for="name">한 줄 소개</label>
                    <input id="inputs" type="text" name="content" placeholder="  한 줄로 자신을 표현하세요!" onChange={handleChange}/><br />
                    <div id="btnBox">
                    <button id="submitBtn" onClick={handleSubmit}>프로필 편집</button>
                    </div>
                </form>
            </div>
       </div></div>
    )
}
export default EditProfile;