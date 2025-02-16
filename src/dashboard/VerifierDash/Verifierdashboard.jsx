

import '../../assetsdash/css/material-dashboard.min.css'

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import img1 from '../../assets/img/verifier.png';
import { useNavigate } from 'react-router-dom';
import Verifiertable from './Verifiertable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";

function Verifierdashboard() {
    var [doclist, setdoc] = useState([]);
    var [vdoclist, setvdoc] = useState([]);
    const token = localStorage.getItem('verifiertoken');
    const decode = jwtDecode(token);
    const isexpire = decode.exp ? decode.exp * 1000 < Date.now() : true;
    var [loader, setloader] = useState(false);
    var once = useRef(true);

    var navigate = useNavigate();
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
                else if (decode.role != "verifier") {
                    setloader(true);
                    toast.error("You have to login with verifier");
                    once.current = false;
                }
            }
        }

        const fetchdoctor = async () => {
            const res = await axios.get("http://localhost:8080/doctor/get");
            const docdata = res.data.docdata;
            setdoc(docdata);
            const vdocdata = res.data.vdata;
            setvdoc(vdocdata);
            console.log(vdocdata);
        };
        fetchdoctor();



    }, []);

    const logout = () => {
        localStorage.removeItem('verifierdash');
        toast.info("Logout successfully");
        setTimeout(() => {
            navigate('/verifierlogin');
        }, 1200)

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
                            <a href="/adminlogin" className="btn btn-primary">Login</a>
                        </div>
                    </div>
                </>
            ) : (<>
                <div>
                    <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-dark" id="sidenav-main">
                        <div className="sidenav-header">
                            <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                            <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
                                <img src={img1} height="60px" weigth="60px" className="navbar-brand-img ml-10" alt="main_logo" />
                                <span className="ms-1 font-weight-bold text-white ml-10">{'  '}Verifier</span>
                            </a>
                        </div>
                        <hr className="horizontal light mt-0 mb-2" />
                        <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link text-white">
                                        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="material-icons opacity-10">dashboard</i>
                                        </div>
                                        <span className="nav-link-text ms-1">New Requests   </span>
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
                            <div className="container-fluid py-1 px-3">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                        <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href='/#' >Verifier</a></li>
                                    </ol>
                                    <h6 className="font-weight-bolder mb-0">Dashboard</h6>

                                </nav>
                                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 " id="navbar">
                                </div>
                            </div>
                        </nav >
                        {/* <!-- End Navbar --> */}
                        <Verifiertable />


                    </main >



                </div >
            </>)}
            <ToastContainer />
        </div>

    )

}

export default Verifierdashboard