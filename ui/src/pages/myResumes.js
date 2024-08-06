import React, { useEffect, useState } from 'react';
import { Carousel, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const MyResumes = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const contentStyle = {
    margin: 0,
    color: '#fff',
    height: '700px',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#d3744b',
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("token", token);
        const response = await fetch("http://localhost:5038/api/resumedb/getNotes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Fetch error: ', error);
      }
    };

    fetchData();
  }, []);

  const prepareButton = () => {
    navigate('/cv-input');
  }
  console.log(data);

  if (!data || data.length === 0) {
    return (
      <div className='carousel-none-info-container'>
        <h3>You do not have a registered CV.</h3>
        <button onClick={prepareButton}>Prepare a CV now!</button>
      </div>
    );
  }

  return (
    <div className='carousel-container' style={contentStyle}>
      <Carousel afterChange={onChange}>
        {data.map((item, index) => (
          <div key={index} className='pop-up-container'>
            <div className='cv-name-personal-info'>
              <h2>{item.name} {item.lastname}</h2>
              <div className='cv-personal-info-inside'>
                <p>{item.country} |</p>
                <p>{item.phoneNumber} |</p>
                <p>{item.email}</p>
              </div>
            </div>
            <div className='cv-about'>
              <h3>About</h3>
              <p style={{ maxWidth: "100%" }}>{item.about}</p>
            </div>
            <div className='cv-education'>
              <h3>Education</h3>
              <h4>{item.univesityName}</h4>
              <p>{item.degree}</p>
              <p>{item.educationCountry}</p>
              <p>{item.city}</p>
            </div>
            <div className='cv-work-history'>
              <h3>Work History</h3>
              <h4>{item.companyName}</h4>
              <p>{item.position}</p>
              <p>Start Date: {item.startDate}</p>
              <p>End Date: {item.endDate}</p>
            </div>
            <div className='cv-certificate'>
              <h3>Certificates</h3>
              <p>{item.certificate1}</p>
              <p>{item.certificate2}</p>
              <p>{item.certificate3}</p>
            </div>
            <div className='cv-social-media'>
              <h3>Social Media</h3>
              <p>{item.linkedin}</p>
              <p>{item.gitHub}</p>
              <p>{item.instagram}</p>
              <p>{item.twitter}</p>
              <p>{item.youtube}</p>
            </div>
          </div>
        ))}
      </Carousel>
      <Button className='button-class' key="submit">Download as PDF</Button>
    </div>
  );
};
