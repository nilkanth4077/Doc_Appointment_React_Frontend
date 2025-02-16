
import React, { Component, useRef } from 'react'
import Header from './Header';
import Footer from './Footer';
import img3 from '../assets/img/03.png';
import img2 from '../assets/img/02.png';
import img1 from '../assets/img/01.png';
import online from '../assets/img/online.jpg';
import female from '../assets/img/female.jpeg';
import img4 from '../assets/img/images.png';
import { useState, useEffect } from "react";
import axios, { isCancel, AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";



function Index() {
    const [allspeciaity, setallspeciality] = useState([]);
    const navigate = useNavigate();
    var [loader, setloader] = useState(false);
    var once = useRef(true);
    useEffect(() => {
        const token = localStorage.getItem('patienttoken');
        const decode = jwtDecode(token);
        const isexpire = decode.exp ? decode.exp * 1000 < Date.now() : true;
        if (once.current) {
            if (!token) {
                setloader(true);
                toast.error("Login first");
                once.current = false;
            }
            else {
                if (isexpire) {
                    setloader(true);
                    toast.error("Session expire login again");
                    once.current = false;
                }
                else if (decode.role != "patient") {
                    setloader(true);
                    toast.error("You have to login with patient");
                    once.current = false;
                }
            }
        }

        const getSpeciality = async () => {

            await axios.get("http://localhost:8080/getSpeciality").then((res) => {
                // console.log(res.data.specialistdata);
                var data = res.data.specialistdata;
                // console.log(data);
                setallspeciality(data);
                // console.log(allspeciaity);
            });
        };
        getSpeciality();

    }, []);
    const [appodetails, setdetails] = useState({
        specialist: "",
    })

    const { specialist } = appodetails;
    const handleInput = (e) => {
        setdetails({ ...appodetails, [e.target.name]: e.target.value });
    }
    const submit = async e => {

        e.preventDefault();
        if (appodetails.specialist == "") {
            console.log("in if");
            toast.error("select specialist first");
        }
        else {
            await axios.post("http://localhost:8080/finddoc", appodetails).then((res) => {
                if (res.data.message == "finddoc") {
                    // console.log(res.data.docinfo.length);
                    if (res.data.docinfo.length > 0) {
                        navigate("/selectedspecialist", { state: { docinfo: res.data.docinfo } });
                    }
                    else {
                        // console.log("i am in else");
                        toast.error("No doctors are available");
                    }

                }
                else if (res.data.message == "nodoc") {
                    toast.error("No doctors are available");
                }

            });
        }

    }
    const logout = () => {
        localStorage.removeItem("patienttoken");
        toast.info("Logout successfully");
        setTimeout(() => {
            navigate("/patientlogin");
        }, 1100);

    }
    return (
        <div>
            {loader ? (
                <>
                    {/* <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary " role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div> */}
                    <div className="d-flex align-items-center justify-content-center vh-100">
                        <div className="text-center">
                            <h1 className="display-1 fw-bold">401</h1>
                            <p className="fs-3"> <span className="text-danger">Opps!</span> You have to login first</p>
                            <p className="lead">
                                Got ot login page
                            </p>
                            <a href="/patientlogin" className="btn btn-primary">Login</a>
                        </div>
                    </div>
                </>
            ) : (<>
                <div>
                    <header>
                        <nav className="navbar navbar-expand-lg shadow navbar-light" id="patient_nav">
                            <div className="container">
                                <button className="navbar-toggler navbar-left collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content">
                                    <div className="hamburger-toggle">
                                        <div className="hamburger">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </button>
                                <a className="navbar-brand" href="index.php"><img src={img4} className="img-fluid" alt="India’s best doctor healthcare app solution provider" style={{ height: "50px", weight: "50px" }} /></a>
                                <div className="collapse navbar-collapse" id="navbar-content">
                                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <a className="nav-link" href="/index" >Home</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#online_consulting">Book Doctor</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href='/patientdashboard'>Profile</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#specialties">Specialties</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/PatientVideoCall">Videocall</a>
                                        </li>

                                        <a className="btn btn-info msp_5 position-absolute top-11 end-10" style={{ backgroundColor: "blue" }} href="/docreg">I'm Doctor</a>


                                        <button onClick={logout} type="button" className="btn btn-danger msp_5 position-absolute top-11 end-2">Logout</button>
                                        {/* <a className="nav-link msp_5 position-absolute top-11 end-2" style={{ backgroundColor: "red" }} href="/docreg">Logout</a> */}

                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </header>
                    <section className="patient_home_banner" id="home">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 order-sm-1 order-1">
                                    <div className="banner_title" data-animation="fadeInLeft" animation-delay="2s" data-delay="0.3s">
                                        <h1>Your Health<br /><span>Our Priority</span></h1>
                                        <p className="py-3">India's Hassle Free Doctor Appointment Booking App. Get Seamless OPD experience by
                                            booking the free appointment with India’s Top specialize doctor online. Q UP enhance the
                                            connection between patient and doctor in best possible manner.</p>

                                    </div>
                                </div>
                                <div className="col-lg-6 order-sm-2 order-2">

                                    <img src={female} className="img-fluid mt-5" alt="Track Your Heatlh with Q UP App" />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container-fluid py-5">
                            <div className="container">
                                <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                                    {/* <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Services</h5> */}
                                    <h1 className="display-4">Excellent Medical Services</h1>
                                </div>
                                <div className="row g-5">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                                            <div className="service-icon mb-4 mt-2">
                                                <i className="fa fa-2x fa-user-md text-black"></i>
                                            </div>
                                            <h4 className="mb-3">Emergency Care</h4>
                                            <p className="m-0">Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum stet, justo elitr dolor amet sit</p>
                                            <a className="btn btn-lg btn-primary rounded-pill mb-2" href="">
                                                <i className="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                                            <div className="service-icon mb-4 mt-2">
                                                <i className="fa fa-2x fa-procedures text-black"></i>
                                            </div>
                                            <h4 className="mb-3">Operation & Surgery</h4>
                                            <p className="m-0">Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum stet, justo elitr dolor amet sit</p>
                                            <a className="btn btn-lg btn-primary rounded-pill mb-2" href="">
                                                <i className="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                                            <div className="service-icon mb-4 mt-2">
                                                <i className="fa fa-2x fa-stethoscope text-black"></i>
                                            </div>
                                            <h4 className="mb-3">Outdoor Checkup</h4>
                                            <p className="m-0">Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum stet, justo elitr dolor amet sit</p>
                                            <a className="btn btn-lg btn-primary rounded-pill mb-2" href="">
                                                <i className="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                                            <div className="service-icon mb-4 mt-2">
                                                <i className="fa fa-2x fa-ambulance text-black"></i>
                                            </div>
                                            <h4 className="mb-3">Ambulance Service</h4>
                                            <p className="m-0">Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum stet, justo elitr dolor amet sit</p>
                                            <a className="btn btn-lg btn-primary rounded-pill mb-2" href="">
                                                <i className="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                                            <div className="service-icon mb-4 mt-2">
                                                <i className="fa fa-2x fa-pills text-black"></i>
                                            </div>
                                            <h4 className="mb-3">Medicine & Pharmacy</h4>
                                            <p className="m-0">Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum stet, justo elitr dolor amet sit</p>
                                            <a className="btn btn-lg btn-primary rounded-pill mb-2" href="">
                                                <i className="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                                            <div className="service-icon pb-4 mt-2">
                                                <i className="fa fa-2x fa-microscope text-black"></i>
                                            </div>
                                            <h4 className="mb-3">Blood Testing</h4>
                                            <p className="m-0">Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum stet, justo elitr dolor amet sit</p>
                                            <a className="btn btn-lg btn-primary rounded-pill mb-2" href="">
                                                <i className="bi bi-arrow-right "></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="secton_padding bck_sec" id="online_consulting">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 position-relative">
                                    <img style={{ heigth: "600px", width: "600px" }} src={online} className="img-fluid abt_img" alt="India Best Doctor Appointment Booking App" />
                                </div>
                                <div className="col-lg-5">
                                    <h4 className="sub_heading">Ask Doctor, in Just One Click!</h4>
                                    <h2 className="heading">Consult online via video, audio or text.</h2>
                                    <div className="row ">
                                        <div className="col-12 col-sm-6">
                                            <select name="specialist" value={specialist} onChange={e => handleInput(e)} className="form-select bg-light border-0" style={{ height: "55px" }} required >
                                                <option value="">Select Specialty</option>
                                                {
                                                    allspeciaity.map((x) => (
                                                        <option value={x.speciality}>{x.speciality}</option>
                                                    ))
                                                }

                                            </select>
                                        </div>
                                        <div className="col-5">
                                            <button onClick={submit} className="btn btn-dark w-100 py-3" type="submit">Make Appointment</button>
                                        </div>
                                    </div>
                                    <p className="pb-4">Bring your health manager home by installing Q UP. Easy to book appointments, track
                                        health, consult online and keep medical records.</p>

                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="howitworks" id="services">
                        <div className="container">
                            <div className="row">
                                <div className="offset-lg-3 col-lg-6 title_center">
                                    <h2 className="sub_heading mb-4">We understand and <br /><span className="clr_heading">care about your
                                        health.</span></h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 mb-5">
                                    <div className="service_wrapper">
                                        <div className="service_icon mb-3">
                                            <img src={img2} className="img-fluid" alt="Track Your Heatlh with Q UP App" />
                                        </div>
                                        <div className="service_content">
                                            <h3>Track your Health</h3>
                                            <p>Health Tracker records and manages health statistics and analyses progress. Keeps records of
                                                parameters like weight, blood glucose level, creatinine etc.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-5">
                                    <div className="service_wrapper">
                                        <div className="service_icon mb-3">
                                            <img src={img1} className="img-fluid" alt="Store Your Medical History with " />
                                        </div>
                                        <div className="service_content">
                                            <h3>Electronic Medical Records (EMR)</h3>
                                            <p>Digital storage of medical records that can be accessed anytime. Now, there is no need to
                                                worry about keeping the collection of medical records in paper format.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-5">
                                    <div className="service_wrapper">
                                        <div className="service_icon mb-3">
                                            <img src={img3} className="img-fluid" alt="Real-time doctor appointment update for your app" />
                                        </div>
                                        <div className="service_content">
                                            <h3>Real-Time Updates</h3>
                                            <p>Get live availability and OPD status of doctors. Updates you about leave, emergency or change
                                                in doctor's schedule.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section_padding faq bck_sec" id="faq">
                        <div className="container">
                            <h2 className="sub_heading text-center pb-4">FAQ</h2>
                            <div className="wrapper">
                                <div className="faq_container">
                                    <div className="question">
                                        How do I get started with Q UP's online doctor consultations?
                                    </div>
                                    <div className="answercont">
                                        <div className="answer">
                                            <p><b>On Q UP, starting an online medical consultation is a simple. Follow these four easy
                                                steps:</b></p>
                                            <ul>
                                                <li>Select your health condition</li>
                                                <li>Speak with a doctor in under 2-3 minutes</li>
                                                <li>Ask the doctor your questions through audio or video chat</li>
                                                <li>Receive a legitimate online doctor prescription.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="faq_container">
                                    <div className="question">
                                        What happens if I don't hear back from a doctor?
                                    </div>
                                    <div className="answercont">
                                        <div className="answer">
                                            <p>In the odd case that an online doctor does not answer, you will receive a full refund.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="faq_container">
                                    <div className="question">
                                        Is it safe to have an online consultation?
                                    </div>
                                    <div className="answercont">
                                        <div className="answer">
                                            <p>Q UP keeps your medical history and online consultations entirely confidential and safe.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="faq_container">
                                    <div className="question">
                                        Will I be notified if the doctor cancels the appointment?
                                    </div>
                                    <div className="answercont">
                                        <div className="answer">
                                            <p>Yes, you will receive the message. All users of Q UP receive message regarding appointment
                                                including reminder, cancel notification or change schedule.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="faq_container">
                                    <div className="question">
                                        Will my medical records be saved with the app?
                                    </div>
                                    <div className="answercont">
                                        <div className="answer">
                                            <p>Yes, the app will maintain electronic medical reports. Patients and their doctors can access
                                                the records during the investigation. You can also keep health track. This includes blood
                                                pressure, cholesterol and sugar levels.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="faq_container">
                                    <div className="question">
                                        Can patients ask doctors to come home?
                                    </div>
                                    <div className="answercont">
                                        <div className="answer">
                                            <p>Yes, if the doctor provides home service. Usually patients book appointment for consultation
                                                or they go along with online consultation. It only takes a few minutes to book an
                                                appointment on Q UP.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>


                    <section className="section_seo_data">
                        <div className="container">
                            <div className="seo_para">
                                <h2 className="seo_title">Best Online Doctor Consultation App</h2>
                                <p>Q UP is one of the best doctor appointment booking free app in India with more than 20 specialties and
                                    5000+ doctors from all over India (including different states). Patient can online schedule appointments
                                    with doctors any time as per slot availability. There are more than 20+ specialties where you can select
                                    among them like MD medicine, Orthologiest, Cardiologist, Gynecology, Rhetomologist, Diabetologist, etc.
                                    Patient from all around India use Q UP app for best doctor consultation.</p>

                                <h3 className="seo_title pt-3">Best Online Doctor Consultation App in India</h3>
                                <p>When people search for best online doctor consultation app then Q UP stands the all above position. The
                                    multispeciality approach towards finding out the best speciality is never been an easy job. Q UP helps
                                    patient to search among the most prominent doctors all around the India. Now a days, experience of
                                    surgeon or doctor also matter and what we found that Q UP company provides the most refined doctors from
                                    India. Doctor Booking Online made easy with us. Just one tap and the doctor app link on your smartphone
                                </p>

                                <h2 className="seo_title">Trusted & Secured Online Doctor Consultation App In India</h2>
                                <p>Audio and Video consultation with a doctor is available on Q UP's <a
                                    href="https://qupapp.com/patient-home.php#home" target="_blank">online doctor app.</a> Our network
                                    of over 5,000+ trusted doctors from 20+ specialties will ensure that all of your health concerns are
                                    addressed. Avoid travel by consulting with a Doctor Online on Q UP.</p>

                                <h2 className="seo_title">One-stop Solution For Online Doctor Consultation</h2>
                                <p>Q UP is the one-stop solution for any health concern. Q UP is the best doctor booking app. You can chat
                                    with a doctor anytime from the comfort of your home. Q UP is a Convenient and Easy to use doctor
                                    consultation app.</p>

                                <h2 className="seo_title">Consult Doctor Online In Various Specializations</h2>
                                <p>You can get online doctor's advice, who specialises in Neurology, Gynaecology, Dermatology, Psychiatry,
                                    Pulmonologist, Oncologist, Cardiology, Otolaryngologist,Ophthalmology, Dentist, Nephrology and Urology,
                                    Homoeopathy, Ayurveda, Paediatrics, Orthopaedic and many more.</p>

                                <h2 className="seo_title">India’s Best Doctor Appointment App</h2>
                                <p>Q UP is the best app for online doctor consultation. Try India’s best <a
                                    href="https://qupapp.com/patient-home.php#home">doctor booking app</a> Q UP and feel the difference.
                                    Consult instantly with a doctor on Q UP with 24/7 service available. You can also visit a doctor by
                                    taking an appointment through the app.</p>

                                <h2 className="seo_title">India’s Fastest Doctor Booking App</h2>
                                <p>Connect with India's top doctors online on Q UP and take care of you and your loved ones from the comfort
                                    of your home. Consult with the best doctor online who specializes in various fields. </p>
                            </div>
                        </div>
                    </section>
                    <Footer />

                </div>
            </>)}
            <ToastContainer />

        </div>
    )
}


export default Index