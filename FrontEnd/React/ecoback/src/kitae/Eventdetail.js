import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BackbuttonBar from 'components/BackbuttonBar';
import TitleBanner from '../components/TitleBanner';
import API from "api/axios";
import { Link, useNavigate } from 'react-router-dom';

import '../css/Eventdetail.css';

const EventDetail = () => {
  const location = useLocation();
  const eventId = location.pathname.split('/').pop(); // URL에서 이벤트 ID가 있다고 가정합니다.
  const [eventDetail, setEventDetail] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `/events/${eventId}/`;
      const access_token = localStorage.getItem('access');
      try {
        const response = await API.get(endpoint, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        setEventDetail(response.data);
      } catch (e) {
        console.error("API 오류: ", e);
        navigate('/');
      }
    };

    fetchData();
  }, [eventId]);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit', // Ensure two digits for month
      day: '2-digit',   // Ensure two digits for day
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  
    const formattedDate = new Date(dateString).toLocaleDateString('ko-KR', options);
  
    return formattedDate;
  };
  
  // Example usage
  const date = '2023-01-05T12:30:45'; // Replace with your actual date string
  const formattedDate = formatDate(date);
  console.log(formattedDate);
  

  return (
    <div className="full_container">
      <TitleBanner />
      <hr></hr>
      {eventDetail && (
        <React.Fragment>
          <BackbuttonBar title={eventDetail.writer} />
          <div>
            {/* <h2>{eventDetail.writer}</h2> */}
            <br></br>
            <div className='datebox'>
            작성일: {formatDate(eventDetail.created_at)}<br></br>
            수정일: {formatDate(eventDetail.updated_at)}
            </div>
            <img className="events_image" src={eventDetail.image} alt={eventDetail.writer} />
            <p className="eventcontent" style={{ whiteSpace: 'pre-wrap' }}>{eventDetail.content}</p>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default EventDetail;

	