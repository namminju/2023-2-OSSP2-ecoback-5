import BadgeGrid from '../seulgi/myBadge.js';
import '../seulgi/mypage.css'
import TitleBanner from '../components/TitleBanner.js';
import API from "api/axios"
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { BadgeCountContext } from '../seulgi/BadgeCountContext';


const MyPage=()=>{
    
    
    let badgCnt=0;
    const [userId, setUserId]=useState(0);
    const [writer, setWriter]=useState({writer:""});
    const [barcodeCounts, setBarcodeCounts] = useState({count:0});
    const [userPoint, setUserPoint]=useState({ point: 0 });
    const access_token=localStorage.getItem('access');
    const navigate = useNavigate();
    useEffect(()=>{
        getUserData();
    
        
    },[])
    const getUserData=async()=>{
        try{
            const getUserInfo=await API.get('/mypage/get_object/', {
                headers:{
                    Authorization:`Bearer ${access_token}`
                }
            })
            console.log("getUserInfo:", getUserInfo.data);
            setUserInfo(getUserInfo.data);
            setUserId(getUserInfo.data.id);
            console.log(getUserInfo.data.id);

        }catch(e){
            console.log("get-API 오류: ",e);
            navigate('/');
        }
    }
    useEffect(() => {
        fetchBarcodeData();
        if (userId) { // userId가 0이 아니라면(즉, 유효한 값이라면) getUserBarcData를 호출합니다.
            getUserBarcData();
        }
    }, [userId]);
    const getUserBarcData=async()=>{
        try{
            const getUserInfo=await API.get('/barcodes/', {
                headers:{
                    Authorization:`Bearer ${access_token}`
                }
            })
            console.log("바코드writer:", getUserInfo.data.writer);
            setWriter(getUserInfo.data);
            console.log("id",userId);
            console.log("wirteir",getUserInfo.data);
           
            getUserInfo.data.forEach(barcode => {
                // barcode.writer와 userId가 일치하는지 확인
                console.log("writ:",barcode.writer);
                console.log(userId);
                if(barcode.writer === 39) {
                    console.log('badgCnt:',badgCnt);
                    badgCnt += 1; // 일치하면 cnt를 증가
                }
            });

        }catch(e){
            console.log("get-API 오류: ",e);
            navigate('/');
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
    //const endpoint='/barcodes/count/';

    // useEffect(()=>{
    //     //fetchData();
    //     fetchBarcodeData();
        
    // },[])
    useEffect(()=>{
        getUserData();
        fetchPointData();
        getUserBarcData();
        
    },[])
    /*각 배지별 획득 조건 badges.json 파일에서 확인 가능*/
        console.log("barcodeCounts: ", barcodeCounts.count);
    const fetchBarcodeData=async()=>{
        try{
            const response=await API.get("/barcodes/count/",{
                headers:{
                    Authorization: `Bearer ${access_token}`,
                }
            })
            const matchUserCnt=response.data.count;
            console.log(matchUserCnt);
            console.log("userID: ",userId);
            setBarcodeCounts({ count: matchUserCnt });
            console.log("바코드개수",response.data);
            console.log(response.data);
            
        }catch(e){
            console.log("API 오류: ",e);
        }
    }
    console.log("barcodeCounts: ", barcodeCounts.count);
    
    const fetchPointData=async()=>{
        try{
            const response=await API.get("/mypage/get_object/",{
                headers:{
                    Authorization: `Bearer ${access_token}`,
                }
            })
            setUserPoint({ point:response.data.point});
            console.log("point:",response.data.point);
            

        }catch(e){
            console.log("API 오류: ",e);
        }
    }

    // const fetchData=async()=>{
    //     try{
    //         const response=await API.get("/barcodes/count/",{
    //             headers:{
    //                 Authorization: `Bearer ${access_token}`,
    //             }
    //         })
    //         setBarcodeCounts({ count: response.data.count });
    //         console.log(response.data);
            

    //     }catch(e){
    //         console.log("API 오류: ",e);
    //     }
    // }
    // console.log("barcodeCounts: ", barcodeCounts.count);
    
    
    
    if(barcodeCounts.count>=500){
        badgCnt=7;
    } else if(barcodeCounts.count>=100){
        badgCnt=6;
    }else if(barcodeCounts.count>=50){
        badgCnt=5;
    }else if(barcodeCounts.count>=10){
        badgCnt=4;
    }else if(barcodeCounts.count>=8){
        badgCnt=3;
    }else if(barcodeCounts.count>=5){
        badgCnt=2;
    }else if(barcodeCounts.count>=1){
        badgCnt=1;
    }
    if(userPoint>=200000){
        badgCnt+=1;
    }
    let badgeImageSrc;
    

    const [bgcnt, setBgcnt] = useState(0);

    useEffect(() => {
        const storedBgcnt = localStorage.getItem('bgcnt');
        if (storedBgcnt) {
            setBgcnt(parseInt(storedBgcnt, 10));
        }
    }, []);

    const [userInfo, setUserInfo]=useState([]);
    const {badgeCnt}=useContext(BadgeCountContext);
    useEffect(()=>{
        getUserData();
    },[])
    
    //const access_token=localStorage.getItem('access');
    //const endpoint='/mypage/get_object/';
    
    
    return (
        <div className="full_container" style={{backgroundColor:"#FFFFFF",paddingBottom:"15px", minHeight:"100vh"}}>

        <div>
            <TitleBanner />
            <hr />
            <div className="profileContainer">
                <div id="username">{userInfo.name}님의 프로필</div>
                <div class="profileContent">
                    <div style={{textAlign:"center", margin:"3% 0% 0% 0%"}}>한 줄 소개</div>
                    <hr id="contentHR" />
                    <div style={{textAlign:"center"}}>{userInfo.content}</div>

                </div>
                <div className="faceImage"  style={{marginTop:'5%', padding: 'auto'}}>
                    <img id="faceImage" 
                    src={userInfo.image ? userInfo.image : require("../image/defaultProfile.png")} 
                    alt="faceImg" />
                    <p style={{fontSize:"16px"}}><div>{formDate(userInfo.created_at)}부터 함께하는 중</div></p>

                    <Link to="/editprofilepage">
                    <button id="editProfile">프로필 편집</button>
                    </Link>
                </div>
            </div>
            <hr />
            <div className="badgeCollection">
                <div id='badgeText'>내가 모은 배지</div>
                <div id="badgeCount">{badgCnt}/8</div>
                <BadgeGrid badgeCnt={barcodeCounts.count}/>
            </div>
        </div>
        </div>
    )
}


export default MyPage;