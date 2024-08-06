import React from 'react'
import { SiNike } from "react-icons/si";
import { FaApple, FaMicrosoft } from "react-icons/fa";
import Footer from './footer';
import { useNavigate } from 'react-router-dom';


export const HomePage = () => {
    const navigate = useNavigate();
    
    function homeRouteCV() {
        const token = localStorage.getItem('token');
        
        if (!token) {
            alert('Please Login');
        } else {
            navigate('/cv-input');
        }
    }
    return (
        <div className='home-container'>
            <div className='home-enter-side'>
                <h1>Assemble your professional CV</h1>
                <h4>Prepare and download your professional CV in 15 minutes.</h4>
                <button onClick={homeRouteCV}>Create your CV</button>
                <p>Your chances of getting hired will increase by 65%</p>
            </div>
            <div className='home-slogan-side'>
                <a href='/cv-input'>
                    <img src='https://cdn-icons-png.flaticon.com/256/1093/1093274.png' alt='clickIcon'></img>
                    <div>
                        <h4>Quick and Easy</h4>
                        <p>With CV Maker, everyone can create a professional CV quickly and easily. Enter your personal information and start filling in the CV content. Finally, choose one of our 36 available CV templates and download your CV.</p>
                    </div>
                </a>
                <a href='/cv-input'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYuuCKHTEv1je6HkyqBP-jnOAphJ2o063KRQ&s' alt='worldIcon'></img>
                    <div>
                        <h4>Increase in Employment Chances</h4>
                        <p>With a professional CV that describes you very well, you will stand out among all other candidates. Additionally, your chances of being invited to an interview will increase by up to 65%.</p>
                    </div>
                </a>
                <a href='/cv-input'>
                    <img src='https://png.pngtree.com/png-vector/20190217/ourmid/pngtree-vector-folder-icon-png-image_555545.jpg' alt='folderIcon'></img>
                    <div>
                        <h4>Organize Your Applications</h4>
                        <p>It is quite important to tailor your CV according to the job you are applying for. With your personal account on <strong>CV World</strong>, you will be able to create and edit several different CVs.</p>
                    </div>
                </a>
            </div>
            <div className='home-comments-side'>
                <div className='home-comments-heading'>
                    <h3>What Do Our Users Say?</h3>
                    <p>Thanks to <strong>CV World</strong>, they all found their dream jobs</p>
                </div>
                <div className='comments-details-container'>
                    <div className='comments-details'>
                        <div className='comments-details-inside'>
                            <div className='comments-inside-img'>
                                <img src='https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg' alt='john'></img>
                            </div>
                            <div className='comments-inside-stars'>
                                <h4>John</h4>
                                <img src='https://static.vecteezy.com/system/resources/thumbnails/007/498/655/small/yellow-five-stars-quality-rating-icons-5-stars-icon-five-star-sign-rating-symbol-illustration-vector.jpg' alt='starts'></img>
                            </div>
                        </div>
                        <div className='comments-inside-texts'>
                            <p>Absolutely, <strong>CV World</strong> has been very helpful for me. Thank you for everything!</p>
                            <strong>Career Management</strong>
                        </div>
                    </div>

                    <div className='comments-details'>
                        <div className='comments-details-inside'>
                            <div className="comments-inside-img">
                                <img src='https://bruinlife.s3.us-west-1.amazonaws.com/wp-content/uploads/2018/05/02172507/2B8_5802.jpg' alt='amadeus'></img>
                            </div>
                            <div className='comments-inside-stars'>
                                <h4>Amadeus</h4>
                                <img src='https://static.vecteezy.com/system/resources/thumbnails/007/498/655/small/yellow-five-stars-quality-rating-icons-5-stars-icon-five-star-sign-rating-symbol-illustration-vector.jpg' alt='starts'></img>
                            </div>
                        </div>
                        <div className='comments-inside-texts'>
                            <p>I received positive feedback on my CV and quickly found a great job. I definitely recommend <strong>CV World!</strong></p>
                            <strong>HR Manager</strong>
                        </div>
                    </div>

                    <div className='comments-details'>
                        <div className='comments-details-inside'>
                            <div className="comments-inside-img">
                                <img src='https://media.istockphoto.com/id/615279718/tr/foto%C4%9Fraf/businesswoman-portrait-on-white.jpg?s=612x612&w=0&k=20&c=v5yMr1PZfOPTRB9RNV3rfe4ElgOlvGJ1DPp3o8ifjtw=' alt='ada'></img>
                            </div>
                            <div className='comments-inside-stars'>
                                <h4>Ada</h4>
                                <img src='https://static.vecteezy.com/system/resources/thumbnails/007/498/655/small/yellow-five-stars-quality-rating-icons-5-stars-icon-five-star-sign-rating-symbol-illustration-vector.jpg' alt='starts'></img>
                            </div>
                        </div>
                        <div className='comments-inside-texts'>
                            <p>I find it very useful to organize all my CVs and applications in one place with <strong>CV World!</strong> It has a great selection of CV templates!</p>
                            <strong>Marketing</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className='home-logo-container'>
                <h4><strong>"CV World"</strong> users are getting hired by major companies like</h4>
                <div className='home-logo-inside'>
                    <SiNike />
                    <FaApple />
                    <FaMicrosoft />
                </div>

            </div>
            <Footer />
        </div>
    )
}
