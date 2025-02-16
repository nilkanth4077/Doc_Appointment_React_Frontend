
import '../assetsdash/css/material-dashboard.min.css';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import '../assetsdash/scss/material-dashboard.scss'

import img1 from '../assets/img/verifier.png';
import Table from './table';
import Adminreg from '../pages/adminreg';
import Verifierreg from '../pages/verifierreg';
import Displaydoc from './Displaydoc';
import Displaypatient from './Displaypatient';
import Displayverifier from './Displayverifier';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    var [doclist, setdoc] = useState([]);
    var [vdoclist, setvdoc] = useState([]);
    var [tableunverified, settableunverified] = useState(true);
    var [addadmin, setaddadmin] = useState(false);
    var [addverifier, setaddverifier] = useState(false);
    var [displaydoc, setdisplaydoc] = useState(false);
    var [displaypatient, setdisplaypatient] = useState(false);
    var [displayverifiers, setdisplayverifiers] = useState(false);
    var navigate = useNavigate();
    const token = localStorage.getItem('admintoken');
    const decode = jwtDecode(token);
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
                else if (decode.role != "admin") {
                    setloader(true);
                    toast.error("You have to login with admin");
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
    const funaddadmin = (e) => {
        setaddverifier(false);
        setdisplaydoc(false);
        setdisplaypatient(false);
        settableunverified(false);
        setdisplayverifiers(false);
        setaddadmin(true);
    }
    const funaddverifier = (e) => {
        setdisplaydoc(false);
        setdisplaypatient(false);
        settableunverified(false);
        setaddadmin(false);
        setdisplayverifiers(false);
        setaddverifier(true);
    }
    const fundisplaydoc = (e) => {
        setaddverifier(false);
        setdisplaypatient(false);
        settableunverified(false);
        setaddadmin(false);
        setdisplayverifiers(false);
        setdisplaydoc(true);
    }
    const fundisplaypatient = (e) => {
        setaddverifier(false);
        setdisplaydoc(false);
        settableunverified(false);
        setaddadmin(false);
        setdisplayverifiers(false);
        setdisplaypatient(true);
    }
    const funtableunverified = (e) => {
        setaddverifier(false);
        setdisplaydoc(false);
        setdisplaypatient(false);
        setaddadmin(false);
        setdisplayverifiers(false);
        settableunverified(true);
    }
    const fundisplayverifiers = (e) => {
        setaddverifier(false);
        setdisplaydoc(false);
        setdisplaypatient(false);
        setaddadmin(false);
        settableunverified(false);
        setdisplayverifiers(true);
    }
    const logout = () => {
        localStorage.removeItem('admintoken');
        toast.info("Logout successfully");
        setTimeout(() => {
            navigate('/adminlogin');
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
                                <span className="ms-1 font-weight-bold text-white ml-10">{'  '}Admin</span>
                            </a>
                        </div>
                        <hr className="horizontal light mt-0 mb-2" />
                        <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a onClick={(e) => funtableunverified(e)} className="nav-link text-white ">
                                        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="material-icons opacity-10">dashboard</i>
                                        </div>
                                        <span className="nav-link-text ms-1">Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={(e) => funaddadmin(e)} className="nav-link text-white " >
                                        {/* <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">table_view</i>
                                </div> */}
                                        <span className="nav-link-text ms-1">Add Admin</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={(e) => funaddverifier(e)} className="nav-link text-white ">
                                        {/* <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">receipt_long</i>
                                </div> */}
                                        <span className="nav-link-text ms-1">Add Verifier</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={(e) => fundisplaydoc(e)} className="nav-link text-white ">
                                        {/* <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">view_in_ar</i>
                                </div> */}
                                        <span className="nav-link-text ms-1">Doclist</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={(e) => fundisplaypatient(e)} className="nav-link text-white ">
                                        {/* <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">format_textdirection_r_to_l</i>
                                </div> */}
                                        <span className="nav-link-text ms-1">Patientlist</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={(e) => fundisplayverifiers(e)} className="nav-link text-white ">
                                        {/* <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">format_textdirection_r_to_l</i>
                                </div> */}
                                        <span className="nav-link-text ms-1">Verifierlist</span>
                                    </a>
                                </li>
                                {/* <li className="nav-item">
                            <a className="nav-link text-white " href="../pages/notifications.html">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">notifications</i>
                                </div>
                                <span className="nav-link-text ms-1">Notifications</span>
                            </a>
                        </li> */}

                                {/* <li className="nav-item mt-3">
                            <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
                        </li> */}
                                {/* <li className="nav-item">
                            <a className="nav-link text-white " href="../pages/profile.html">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">person</i>
                                </div>
                                <span className="nav-link-text ms-1">Profile</span>
                            </a>
                        </li> */}
                                <li className="nav-item">
                                    <a onClick={logout} className="nav-link text-white ">
                                        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="material-icons opacity-10">login</i>
                                        </div>
                                        <span className="nav-link-text ms-1">Logout</span>
                                    </a>
                                </li>
                                {/* <li className="nav-item">
                            <a className="nav-link text-white " href="../pages/sign-up.html">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">assignment</i>
                                </div>
                                <span className="nav-link-text ms-1">Sign Up</span>
                            </a>
                        </li> */}
                            </ul>
                        </div>

                    </aside>
                    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                        {/* <!-- Navbar --> */}
                        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
                            <div className="container-fluid py-1 px-3">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                        <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href='/#' >Admin</a></li>
                                        {/* <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li> */}
                                    </ol>
                                    <h6 className="font-weight-bolder mb-0">Dashboard</h6>
                                </nav>
                                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 " id="navbar">
                                    {/* <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                                <div className="input-group input-group-outline">
                                    <label className="form-label">Type here...</label>
                                    <input type="text" className="form-control"/>
                                </div>
                            </div> */}

                                </div>
                            </div>
                        </nav >
                        {/* <!-- End Navbar --> */}

                        {tableunverified ? (
                            <>
                                <Table />
                            </>
                        ) : null

                        }
                        {addadmin ? (
                            <>
                                <Adminreg />
                            </>
                        ) : null

                        }
                        {addverifier ? (
                            <>
                                <Verifierreg />
                            </>
                        ) : null

                        }
                        {displaydoc ? (
                            <>
                                <Displaydoc />
                            </>
                        ) : null

                        }
                        {displaypatient ? (
                            <>
                                <Displaypatient />
                            </>
                        ) : null

                        }
                        {displayverifiers ? (
                            <>
                                <Displayverifier />
                            </>
                        ) : null

                        }

                    </main >
                </div >
            </>)}
            <ToastContainer />
        </div>

    )

}


export default Main