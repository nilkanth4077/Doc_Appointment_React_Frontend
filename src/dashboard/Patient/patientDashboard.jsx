import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import PatientDetails from './patientDetails';
import Reqpendding from './reqpendding';
import Reqdone from './reqdone';
import Reqapproved from './reqapproved';

function PatientDashboard() {

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('patienttoken');
        const decode = jwtDecode(token);
        const isexpire = decode.exp ? decode.exp * 1000 < Date.now() : true;
        if (!token) {
            navigate('/patientlogin');
        }
        else {
            if (isexpire) {
                navigate('/patientlogin');
            }
            else if (decode.role != "patient") {
                navigate('/patientlogin');
                toast.error("You have to login with patient");
            }
        }

    }, []);

    var [details, setdetails] = useState(true);
    var [pendding, setpendding] = useState(false);
    var [done, setdone] = useState(false);
    var [approved, setapproved] = useState(false);



    const fundetails = (e) => {
        setdetails(true);
        setapproved(false);
        setdone(false);
        setpendding(false);
    }
    const fundone = (e) => {
        setdetails(false);
        setapproved(false);
        setdone(true);
        setpendding(false);
    }
    const funpendding = (e) => {
        setdetails(false);
        setapproved(false);
        setdone(false);
        setpendding(true);
    }
    const funapproved = (e) => {
        setapproved(true);
        setdetails(false);
        setdone(false);
        setpendding(false);
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
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-dark" id="sidenav-main">
                <div className="sidenav-header">
                    <h4 style={{ color: "white", paddingTop: "20px", paddingLeft: "25px" }} >Patient dashboard</h4>
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
                            <a href='/index' className="nav-link text-white ">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">assignment</i>
                                </div>
                                <span className="nav-link-text ms-1">Index</span>
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

                {details ? (
                    <>
                        <PatientDetails />
                    </>
                ) : null}
                {pendding ? (
                    <>
                        <Reqpendding />
                    </>
                ) : null}
                {done ? (
                    <>
                        <Reqdone />
                    </>
                ) : null}
                {approved ? (
                    <>
                        <Reqapproved />
                    </>
                ) : null}

            </main >



        </div >
    )
}

export default PatientDashboard