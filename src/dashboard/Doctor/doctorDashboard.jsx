import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Drdetails from './Drdetails';
import Drapproved from './Drapproved';
import Drdone from './Drdone';
import Drpendding from './Drpendding';

function DoctorDashboard() {
    // var [appointmentlist, setappointmentlist] = useState([]);
    // var [vdoclist, setvdoc] = useState([]);
    // // const [data, setdata] = useState(location.state.docemail);
    // useEffect(() => {
    //     const islogindoctor = localStorage.getItem('islogindoctor');
    //     if (islogindoctor != null) {
    //         console.log("in oslogin")
    //         navigate('/doclogin');
    //     } else {
    //         const fetchdoctor = async () => {
    //             const res = await axios.get("https://doc-appointment-node-backend.onrender.com/appointment/get");
    //             const vdocdata = res.data.vdata;
    //             setvdoc(vdocdata);
    //             console.log(vdocdata);
    //         };
    //         fetchdoctor();
    //     }

    // }, []);
    // var navigate = useNavigate();
    // const logout = () => {
    //     localStorage.removeItem('islogindoctor');
    //     navigate('/doclogin');
    // }
    const location = useLocation();
    const navigate = useNavigate();
    var [drdetails, setdrdetails] = useState(true);
    var [drpendding, setdrpendding] = useState(false);
    var [drdone, setdrdone] = useState(false);
    var [drapproved, setdrapproved] = useState(false);
    const token = localStorage.getItem('doctortoken');
    const decode = jwtDecode(token);
    // console.log(decode.role);
    const isexpire = decode.exp ? decode.exp * 1000 < Date.now() : true;
    var [loader, setloader] = useState(false);
    var once = useRef(true);

    useEffect(() => {

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
                else if (decode.role != "doctor") {
                    setloader(true);
                    toast.error("You have to login with doctor");
                    once.current = false;
                }
            }
        }

    })

    const fundetails = (e) => {
        setdrdetails(true);
        setdrapproved(false);
        setdrdone(false);
        setdrpendding(false);
    }
    const fundone = (e) => {
        setdrdetails(false);
        setdrapproved(false);
        setdrdone(true);
        setdrpendding(false);
    }
    const funpendding = (e) => {
        setdrdetails(false);
        setdrapproved(false);
        setdrdone(false);
        setdrpendding(true);
    }
    const funapproved = (e) => {
        setdrapproved(true);
        setdrdetails(false);
        setdrdone(false);
        setdrpendding(false);
    }
    const logout = () => {
        localStorage.removeItem("doctortoken");
        localStorage.removeItem("appointmentdata");
        toast.info("Logout successfully");
        setTimeout(() => {
            navigate("/doclogin");
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
                            <a href="/doclogin" className="btn btn-primary">Login</a>
                        </div>
                    </div>
                </>
            ) : (<>
                <div>
                    <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-dark" id="sidenav-main">
                        <div className="sidenav-header">
                            <h4 style={{ color: "white", paddingTop: "20px", paddingLeft: "25px" }} >Doctor dashboard</h4>
                        </div>
                        <hr className="horizontal light mt-0 mb-2" />
                        <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a onClick={(e) => fundetails(e)} className="nav-link text-white ">
                                        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            {/* <i className="material-icons opacity-10">table_view</i> */}
                                        </div>
                                        <span className="nav-link-text ms-1">My Details</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={(e) => funpendding(e)} className="nav-link text-white" >
                                        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            {/* <i className="material-icons opacity-10">dashboard</i> */}
                                        </div>
                                        <span className="nav-link-text ms-1">Pendding Appointment</span>
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a onClick={(e) => funapproved(e)} className="nav-link text-white ">
                                        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            {/* <i className="material-icons opacity-10">receipt_long</i> */}
                                        </div>
                                        <span className="nav-link-text ms-1">Approved Appointment</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={(e) => fundone(e)} className="nav-link text-white ">
                                        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            {/* <i className="material-icons opacity-10">receipt_long</i> */}
                                        </div>
                                        <span className="nav-link-text ms-1">Doned Appointment</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={logout} className="nav-link text-white ">
                                        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="material-icons opacity-10">login</i>
                                        </div>
                                        <span className="nav-link-text ms-1">Logout</span>
                                    </a>
                                </li>

                            </ul>
                        </div>

                    </aside>
                    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                        {/* <!-- Navbar --> */}
                        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">

                        </nav >
                        {/* <!-- End Navbar --> */}

                        {drdetails ? (
                            <>
                                <Drdetails />
                            </>
                        ) : null}
                        {drpendding ? (
                            <>
                                <Drpendding />
                            </>
                        ) : null}
                        {drdone ? (
                            <>
                                <Drdone />
                            </>
                        ) : null}
                        {drapproved ? (
                            <>
                                <Drapproved />
                            </>
                        ) : null}

                    </main >



                </div >
            </>)}
            <ToastContainer />
        </div>
    )
}

export default DoctorDashboard