import React, { useState } from 'react';
import { Button, Modal, Radio } from 'antd';

const PopUpButtonComp = ({
    onClick,
    name,
    lastname,
    about,
    certificate1,
    certificate2,
    certificate3,
    companyName,
    degree,
    email,
    endDate,
    gitHub,
    instagram,
    linkedin,
    country,
    phoneNumber,
    position,
    startDate,
    twitter,
    educationCountry,
    univesityName,
    youtube,
    city,
    btnClass
}) => {
    const [valueRadio, setValueRadio] = useState({ background: "white", color: "black" });
    const [open, setOpen] = useState(false);

    const onChangeRadio = (e) => {
        const color = e.target.value;
        let textColor;

        switch (color) {
            case "red":
                textColor = "white";
                break;
            case "blue":
                textColor = "white";
                break;
            case "yellow":
                textColor = "black";
                break;
            case "black":
                textColor = "wheat";
                break;
            case "brown":
                textColor = "white";
                break;
            case "white":
                textColor = "black";
                break;
            default:
                textColor = "black";
        }

        setValueRadio({ background: color, color: textColor });
    }

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button className={btnClass} onClick={showModal}>Preview</Button>

            <Modal
                className='modal-container'
                open={open}
                title="Check Your Informations"
                onCancel={handleCancel}
                footer={[
                    <div className='pop-up-btn'>
                        <Button className='button-class' key="submit" onClick={onClick}>Save</Button>
                    </div>
                ]}>
                <Radio.Group onChange={onChangeRadio} value={valueRadio.background}>
                    <Radio value="red">Red</Radio>
                    <Radio value="blue">Blue</Radio>
                    <Radio value="yellow">Yellow</Radio>
                    <Radio value="black">Dark</Radio>
                    <Radio value="brown">Brown</Radio>
                    <Radio value="white">White</Radio>
                </Radio.Group>
                <div className='pop-up-container' style={{ background: valueRadio.background, color: valueRadio.color }}>
                    <div className='cv-name-personal-info'>
                        <h2>{name} {lastname}</h2>
                        <div className='cv-personal-info-inside'>
                            <p>{country} |</p>
                            <p>{phoneNumber} |</p>
                            <p>{email}</p>
                        </div>
                    </div>
                    <div className='cv-about'>
                        <h3>About</h3>
                        <p style={{ maxWidth: "100%" }}>{about}</p>
                    </div>
                    <div className='cv-education'>
                        <h3>Education</h3>
                        <h4>{univesityName}</h4>
                        <p>{degree}</p>
                        <p>{educationCountry}</p>
                        <p>{city}</p>
                    </div>
                    <div className='cv-work-history'>
                        <h3>Work History</h3>
                        <h4>{companyName}</h4>
                        <p>{position}</p>
                        <p>Start Date: {startDate}</p>
                        <p>End Date: {endDate}</p>
                    </div>
                    <div className='cv-certificate'>
                        <h3>Certificates</h3>
                        <p>{certificate1}</p>
                        <p>{certificate2}</p>
                        <p>{certificate3}</p>
                    </div>
                    <div className='cv-social-media'>
                        <h3>Social Media</h3>
                        <p>{linkedin}</p>
                        <p>{gitHub}</p>
                        <p>{instagram}</p>
                        <p>{twitter}</p>
                        <p>{youtube}</p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default PopUpButtonComp;
