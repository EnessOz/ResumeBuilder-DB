import React, { useState } from 'react';
import { InputCompShort } from './inputCompShort';
import { DateComp } from './dateComp';
import UniversitySelectComp from './universitySelectComp';
import { RangeDateComp } from './rangeDateComp';
import { InputCompLong } from './inputCompLong';
import { SelecterDependenceComp } from './selecterDependenceComp';
import SelecterComp from './selecterComp';
import PopUpButtonComp from './popUpButtonComp';
import { useNavigate } from 'react-router-dom';


const TabMenu = () => {
    const navigate = useNavigate();
    

    const [activeTab, setActiveTab] = useState('About');
    const [usersDataObject, setUsersDataObject] = useState({
        name: '',
        lastname: '',
        adress: '',
        phoneNumber: '',
        birthday: '',
        email: '',
        country: '',
        postCode: '',
        about: '',
        educationCountry: '',
        city: '',
        university: '',
        degree: '',
        certificate1: '',
        certificate2: '',
        certificate3: '',
        companyName: '',
        companyName2: '',
        position: '',
        position2: '',
        startDate: '',
        endDate: '',
        skills: '',
        instagram: '',
        linkedIn: '',
        github: '',
    });

    const openCity = (cityName) => {
        setActiveTab(cityName);
    };

    const handleRangeChange = (dates) => {
        const [start, end] = dates || [];
        setUsersDataObject(prevState => ({
            ...prevState,
            startDate: start ? start.format('YYYY-MM-DD') : '',
            endDate: end ? end.format('YYYY-MM-DD') : ''
        }));
    };

    const handleSubmit = async () => {
        if (
            !usersDataObject.name ||
            !usersDataObject.lastname ||
            !usersDataObject.email ||
            !usersDataObject.phoneNumber ||
            !usersDataObject.adress ||
            !usersDataObject.city ||
            !usersDataObject.country ||
            !usersDataObject.degree ||
            !usersDataObject.educationCountry ||
            !usersDataObject.university
        ) {
            alert("Please fill in the required fields!");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('User is not authenticated');
            return;
        }

        try {
            const response = await fetch("http://localhost:5038/api/resumedb/AddUserInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(usersDataObject)
            });

            const result = await response.json();
            if (response.ok) {
                alert("Data submitted successfully");
                navigate('/pdf');
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Failed to submit data:", error);
            alert("Failed to submit data");
        }
    };

    console.log("usersData", usersDataObject);
    return (
        <div>
            <div className="tab">
                <button className={`tablinks ${activeTab === 'About' ? 'active' : ''}`} onClick={() => openCity('About')}>About</button>
                <button className={`tablinks ${activeTab === 'Education' ? 'active' : ''}`} onClick={() => openCity('Education')}>Education</button>
                <button className={`tablinks ${activeTab === 'Experience' ? 'active' : ''}`} onClick={() => openCity('Experience')}>Experience</button>
                <button className={`tablinks ${activeTab === 'Social' ? 'active' : ''}`} onClick={() => openCity('Social')}>Media</button>
            </div>
            <div id="About" className={`tabcontent ${activeTab === 'About' ? 'active' : ''}`}>
                <div className='about-tab-inside'>
                    <div className='about-inside-left'>
                        <InputCompShort placeholder="Name*" onChange={(e) => setUsersDataObject(prevState => ({
                            ...prevState,
                            name: e.target.value
                        }))} />
                        <InputCompShort placeholder="Email*" type="email" onChange={(e) => setUsersDataObject(prevState => ({
                            ...prevState,
                            email: e.target.value
                        }))} />
                        <InputCompShort placeholder="Phone Number*" type="number" maxLength="20" onChange={(e) => setUsersDataObject(prevState => ({
                            ...prevState,
                            phoneNumber: e.target.value
                        }))} />
                        <DateComp onChange={(value) => setUsersDataObject(prevState => ({
                            ...prevState,
                            birthday: value
                        }))} />
                    </div>
                    <div className='about-inside-right'>
                        <InputCompShort placeholder="Last Name*" onChange={(e) => setUsersDataObject(prevState => ({
                            ...prevState,
                            lastname: e.target.value
                        }))} />
                        <InputCompShort placeholder="Address*" onChange={(e) => setUsersDataObject(prevState => ({
                            ...prevState,
                            adress: e.target.value
                        }))} />
                        <InputCompShort placeholder="Post Code" type="number" onChange={(e) => setUsersDataObject(prevState => ({
                            ...prevState,
                            postCode: e.target.value
                        }))} />

                        <SelecterComp placeHolder="Select Country*" onChange={(value) => setUsersDataObject(prevState => ({
                            ...prevState,
                            country: value
                        }))} />
                    </div>
                </div>
                <div className='about-yourself-side'>
                    <InputCompLong placeholder="About Yourself" maxLength="400" onChange={(e) => setUsersDataObject(prevState => ({
                        ...prevState,
                        about: e.target.value
                    }))} />
                </div>
            </div>

            <div id="Education" className={`tabcontent ${activeTab === 'Education' ? 'active' : ''}`}>
                <div className='education-tab-inside'>
                    <SelecterDependenceComp placeHolder="Select Country*" onChange={(value) => setUsersDataObject(prevState => ({
                        ...prevState,
                        educationCountry: value
                    }))} />
                    <InputCompShort placeholder="City*" onChange={(e) => setUsersDataObject(prevState => ({
                        ...prevState,
                        city: e.target.value
                    }))} />
                    <InputCompShort placeholder="Degree*" onChange={(e) => setUsersDataObject(prevState => ({
                        ...prevState,
                        degree: e.target.value
                    }))} />
                    <UniversitySelectComp placeHolder="Choose a Institution*" onChange={(value) => setUsersDataObject(prevState => ({
                        ...prevState,
                        university: value
                    }))} />
                    <h3>Certificates</h3>
                    <InputCompShort placeholder="Certificate 1" onChange={(e) => setUsersDataObject(prevState => ({
                        ...prevState,
                        certificate1: e.target.value
                    }))} />

                    <InputCompShort placeholder="Certificate 2" onChange={(e) => setUsersDataObject(prevState => ({
                        ...prevState,
                        certificate2: e.target.value
                    }))} />

                    <InputCompShort placeholder="Certificate 3" onChange={(e) => setUsersDataObject(prevState => ({
                        ...prevState,
                        certificate3: e.target.value
                    }))} />
                </div>
            </div>

            <div id="Experience" className={`tabcontent ${activeTab === 'Experience' ? 'active' : ''}`}>
                <div className='experience-tab-inside'>
                    <div className="experience-item">
                        <InputCompShort placeholder="Company Name" onChange={(e) => setUsersDataObject(prevState => ({
                            ...prevState,
                            companyName: e.target.value
                        }))} />
                        <InputCompShort placeholder="Position" onChange={(e) => setUsersDataObject(prevState => ({
                            ...prevState,
                            position: e.target.value
                        }))} />
                        <RangeDateComp onChange={handleRangeChange} />
                    </div>
                    <div className="experience-item">
                        <InputCompShort placeholder="Company Name 2" onChange={(e) => setUsersDataObject(prevState => ({
                            ...prevState,
                            companyName2: e.target.value
                        }))} />
                        <InputCompShort placeholder="Position" onChange={(e) => setUsersDataObject(prevState => ({
                            ...prevState,
                            position2: e.target.value
                        }))} />
                        <RangeDateComp onChange={handleRangeChange} />
                    </div>
                </div>
            </div>
            <div id="Social" className={`tabcontent ${activeTab === 'Social' ? 'active' : ''}`}>
                <div className='social-tab-inside'>
                    <InputCompShort placeholder="Instagram" onChange={(e) => setUsersDataObject(prevState => ({
                        ...prevState,
                        instagram: e.target.value
                    }))} />
                    <InputCompShort placeholder="LinkedIn" onChange={(e) => setUsersDataObject(prevState => ({
                        ...prevState,
                        linkedIn: e.target.value
                    }))} />
                    <InputCompShort placeholder="GitHub" onChange={(e) => setUsersDataObject(prevState => ({
                        ...prevState,
                        github: e.target.value
                    }))} />


                </div>
            </div>
            <div className='tab-pop-up-container'>
                <PopUpButtonComp onClick={handleSubmit}
                    btnClass="button-class"
                    lastname={usersDataObject.lastname}
                    name={usersDataObject.name}
                    about={usersDataObject.about}
                    certificate1={usersDataObject.certificate1}
                    certificate2={usersDataObject.certificate2}
                    certificate3={usersDataObject.certificate3}
                    companyName={usersDataObject.companyName}
                    degree={usersDataObject.degree}
                    email={usersDataObject.email}
                    endDate={usersDataObject.endDate}
                    gitHub={usersDataObject.github}
                    instagram={usersDataObject.instagram}
                    linkedin={usersDataObject.linkedIn}
                    country={usersDataObject.country}
                    phoneNumber={usersDataObject.phoneNumber}
                    position={usersDataObject.position}
                    startDate={usersDataObject.startDate}
                    twitter={usersDataObject.twitter}
                    educationCountry={usersDataObject.educationCountry}
                    univesityName={usersDataObject.university}
                    youtube={usersDataObject.youtube}
                    city={usersDataObject.city}
                />
            </div>

        </div>
    );
};

export default TabMenu;
