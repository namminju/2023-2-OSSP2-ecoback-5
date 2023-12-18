import badges from '../seulgi/jsonFile/badges.json';
import '../seulgi/mypage.css';
import API from 'api/axios';
import React, {useEffect, useState,  useContext} from 'react';
import {BadgeCountContext} from '../seulgi/BadgeCountContext';

//뱃지 아이콘 생성
// Badge 컴포넌트 정의
function Badge({badge, badgeCnt}){ // badgeCnt props를 받습니다.
    
    const [userPoint, setUserPoint] = useState({ point: 0 });
    const access_token = localStorage.getItem('access');
    
    // useEffect 훅을 제거하고, 바로 badgeCnt 값을 barcodeCounts 상태에 설정합니다.
    const barcodeCounts = { count: badgeCnt };

    const fetchPointData = async () => {
        try {
            const response = await API.get("/mypage/get_object/", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            });
            setUserPoint({ point: response.data.point });
            console.log("point:", response.data.point);
        } catch (e) {
            console.log("API 오류: ", e);
        }
    };

    useEffect(() => {
        fetchPointData();
    }, []);

    let badgeImageSrc;
    if (badge.id === 6) {
        // 6번째 배지인 경우 userPoint를 기준으로 배지획득조건 설정
        badgeImageSrc = userPoint.point >= 200000 ? require('../image/bg4.png') : require('../image/bg9.png');
    } else {
        // 그 외의 배지는 기존 로직을 따르도록(배지카운트로)
        badgeImageSrc = badge.minCount <= barcodeCounts.count ? require(`../image/${badge.img}`) : require('../image/bg9.png');
    }

    return (
        <div style={{
            width: '80%', 
            margin:'5%',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
        }}>
            <div id="hexagon">
                <img id="badgeImg" src={badgeImageSrc} alt={badge.name} />
            </div>
            <p id="badgeName">{badge.name}</p>
        </div>
    );
}

// ... BadgeGrid 컴포넌트는 동일하게 유지됩니다.

// function Badge({badge, badgeCnt}){
    
//     const [bgcnt, setBgcnt] = useState(0);
//     const containerStyle = {
//         width: '80%', 
//         margin:'5%',
//         display:'flex',
//         flexDirection:'column',
//         alignItems:'center',

//     };
//     const {badgeCnt, setBadgeCnt}=useContext(BadgeCountContext);
//     const [barcodeCounts, setBarcodeCounts] = useState({ count: 0 });
//     const [userPoint, setUserPoint]=useState({ point: 0 });
//     //setBadgeCnt(0);
//     useEffect(()=>{
//         setBadgeCnt(0);
//     },[])
//     useEffect(() => {
//         if (badge.minCount < barcodeCounts.count) {
//             setBadgeCnt(prevCnt => prevCnt + 1);
//         }
//     }, [barcodeCounts.count]);


//     const access_token=localStorage.getItem('access');
//     const endpoint='/barcodes/count/';
    
//     useEffect(()=>{
//         fetchData();
        
//     },[])
//     useEffect(()=>{
//         fetchPointData();
        
//     },[])
//     /*각 배지별 획득 조건 badges.json 파일에서 확인 가능*/
    
//     const fetchPointData=async()=>{
//         try{
//             const response=await API.get("/mypage/get_object/",{
//                 headers:{
//                     Authorization: `Bearer ${access_token}`,
//                 }
//             })
//             setUserPoint({ point:response.data.point});
//             console.log("point:",response.data.point);
            

//         }catch(e){
//             console.log("API 오류: ",e);
//         }
//     }

//     const fetchData=async()=>{
//         try{
//             const response=await API.get(endpoint,{
//                 headers:{
//                     Authorization: `Bearer ${access_token}`,
//                 }
//             })
//             setBarcodeCounts({ count: badgeCnt });
//             console.log(response.data);
            

//         }catch(e){
//             console.log("API 오류: ",e);
//         }
//     }
//     console.log("barcodeCounts: ", barcodeCounts.count);
    
    
    
//     let badgeImageSrc;
    
  
//     if (badge.id === 6) {
//     // 6번째 배지인 경우 userPoint를 기준으로 배지획득조건 설정
//     badgeImageSrc = userPoint >= 200000 ? require(('../image/bg4.png')) : require('../image/bg9.png');
//   } else {
//     // 그 외의 배지는 기존 로직을 따르도록(배지카운트로)
//     badgeImageSrc = badge.minCount < barcodeCounts.count ? require(`../image/${badge.img}`) : require('../image/bg9.png');
//   }
//   // Badge 컴포넌트 내부



//   return (
//     <div style={containerStyle}>
//       <div id="hexagon">
//         <img id="badgeImg" src={badgeImageSrc} alt={badge.name} />
//       </div>
//       <p id="badgeName">{badge.name}</p>
//     </div>
//   );
// }

//map함수로 badges 순회하며 뱃지그리드 생성
function BadgeGrid({badgeCnt}){
    return (
        <div className="badgeBox">
            {
                badges.map(badge=>{
                    return <Badge key={badge.id} badgeCnt={badgeCnt} badge={badge} />
                })
            }
        </div>
    )
}

export default BadgeGrid;