import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const Pdf = () => {
  const [data, setData] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        console.log("token", token)
        const response = await fetch("http://localhost:5038/api/resumedb/getNotes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok' + response.statusText);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Fetch error: ', error);

      }
    };

    fetchData();
  }, []);



  const generatePDF = () => {
    const element = document.getElementById('pop-up-container');

    html2canvas(element, { useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const lastElement = data[data.length - 1];
      const name = lastElement.name || 'document';
      const lastname = lastElement.lastname || '';
      const filename = `${name} ${lastname}.pdf`;
      pdf.save(filename);
    });
  };
  

  return (
    <div>
       <div className='pdf-btn'>
            <Button className='button-class2' key="submit" onClick={generatePDF}>Download</Button>
          </div>
      {data ? (
        <div>
         
          <div id='pop-up-container' className='pop-up-container'  style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '210mm', height: '297mm'}}>
            <div className='cv-name-personal-info'>
              <h3>{data[data.length - 1].name} {data[data.length - 1].lastname}</h3>
              <div className='cv-personal-info-inside'>
                <p>{data[data.length - 1].country} |</p>
                <p>{data[data.length - 1].phoneNumber} |</p>
                <p>{data[data.length - 1].email}</p>
              </div>
            </div>
            <div className='cv-about'>
              <h3>About</h3>
              <p style={{ maxWidth: "100%" }}>{data[data.length - 1].about}</p>
            </div>
            <div className='cv-education'>
              <h3>Education</h3>
              <h4>{data[data.length - 1].university}</h4>
              <p>{data[data.length - 1].degree}</p>
              <p>{data[data.length - 1].educationCountry}</p>
              <p>{data[data.length - 1].city}</p>
            </div>
            <div className='cv-work-history'>
              <h3>Work History</h3>
              <h4>{data[data.length - 1].companyName}</h4>
              <p>{data[data.length - 1].position}</p>
              <p>Start Date: {data[data.length - 1].startDate}</p>
              <p>End Date: {data[data.length - 1].endDate}</p>
            </div>
            <div className='cv-certificate'>
              <h3>Certificates</h3>
              <ul>
                <li>{data[data.length - 1].certificate1}</li>
                <li>{data[data.length - 1].certificate2}</li>
                <li>{data[data.length - 1].certificate3}</li>
              </ul>
            </div>
            <div className='cv-social-media'>
              <h3>Social Media</h3>
              <p>{data[data.length - 1].linkedin}</p>
              <p>{data[data.length - 1].gitHub}</p>
              <p>{data[data.length - 1].instagram}</p>
              <p>{data[data.length - 1].twitter}</p>
              <p>{data[data.length - 1].youtube}</p>
            </div>
          </div>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
