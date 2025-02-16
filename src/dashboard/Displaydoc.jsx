import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Displaydoc() {
    var docpdf = { docmail: "" };
    var docstatus = { doctormail: "" };
    var [doclist, setdoc] = useState([]);
    var [vdoclist, setvdoc] = useState([]);
    const fetchdoctor = async () => {
        const res = await axios.get("https://doc-appointment-node-backend.onrender.com/doctor/get");
        const docdata = await res.data.docdata
        setdoc(docdata);
        const vdocdata = res.data.vdata;
        setvdoc(vdocdata);
    };
    useEffect(() => {

        fetchdoctor();

    }, []);

    function getdocpdf(e) {
        console.log("getdoc");
        //setdocument({ ...docpdf, docmail: e.target.value });
        docpdf.docmail = e.target.value;
        console.log(docpdf);
        //setdocument(e);
        axios.post("https://doc-appointment-node-backend.onrender.com/getpdf", docpdf).then((res) => {
            if (res.data.message === "filenowread") {
                //window.location.href = "https://doc-appointment-node-backend.onrender.com/readpdf";
                window.open(
                    'https://doc-appointment-node-backend.onrender.com/readpdf',
                    '_blank' // <- This is what makes it open in a new window.
                );
            }

            // if (res) {
            //     axios.get("https://doc-appointment-node-backend.onrender.com/readpdf");
            // }
        })
    }


    return (
        <div>
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            < div className="container-fluid py-4" >
                                <div className="row">
                                    {/* <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                            <div className="card">
                                <div className="card-header p-3 pt-2">
                                    <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                                        <i className="material-icons opacity-10">weekend</i>
                                    </div>
                                    <div className="text-end pt-1">
                                        <p className="text-sm mb-0 text-capitalize">Total Unverified Doctor</p>
                                        <h4 className="mb-0">{doclist.length}</h4>
                                    </div>
                                </div>
                                <hr className="dark horizontal my-0" />
                                <div className="card-footer p-3">
                                    <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+55% </span>than last week</p>
                                </div>
                            </div>
                        </div> */}
                                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                        <div className="card">
                                            <div className="card-header p-3 pt-2">
                                                <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                                                    <i className="material-icons opacity-10">person</i>
                                                </div>
                                                <div className="text-end pt-1">
                                                    <p className="text-sm mb-0 text-capitalize">Total Verified Doctor</p>
                                                    <h4 className="mb-0">{vdoclist.length}</h4>
                                                </div>
                                            </div>
                                            <hr className="dark horizontal my-0" />
                                            <div className="card-footer p-3">
                                                <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+3% </span>than last month</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                        <div className="card">
                                            <div className="card-header p-3 pt-2">
                                                <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                                                    <i className="material-icons opacity-10">person</i>
                                                </div>
                                                <div className="text-end pt-1">
                                                    <p className="text-sm mb-0 text-capitalize">New Clients</p>
                                                    <h4 className="mb-0">{doclist.length}</h4>
                                                </div>
                                            </div>
                                            <hr className="dark horizontal my-0" />
                                            <div className="card-footer p-3">
                                                <p className="mb-0"><span className="text-danger text-sm font-weight-bolder">-2%</span> than yesterday</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>



                            </div >
                            <br></br>
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                    <h6 className="text-white text-capitalize ps-3">Verified Doctorlist</h6>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Doctor name</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Speciality</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                                {/* <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employed</th> */}
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Doc.Document</th>
                                                {/* <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Verified</th> */}
                                                {/* <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Delete</th>
                                                <th className="text-secondary opacity-7"></th> */}
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                vdoclist.map(doc => (
                                                    <>
                                                        <tr >
                                                            <td>
                                                                <div className="d-flex px-2 py-1">
                                                                    {/* <div>
                                                                        <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
                                                                    </div> */}
                                                                    <div className="d-flex flex-column justify-content-center">
                                                                        <h6 className="mb-0 text-sm">Dr. {doc.fullname}</h6>
                                                                        <p className="text-xs text-secondary mb-0">{doc.email}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <p className="text-xs font-weight-bold mb-0">{doc.specialty}</p>
                                                                <p className="text-xs text-secondary mb-0">Organization</p>
                                                            </td>
                                                            <td className="align-middle text-center text-sm">
                                                                <span className="badge badge-sm bg-gradient-secondary">{doc.role}</span>
                                                            </td>
                                                            {/* <td className="align-middle text-center">
                                                                <span className="text-secondary text-xs font-weight-bold">23/04/18</span>
                                                            </td> */}
                                                            <td className="align-middle text-center text-sm">
                                                                {/* <a onClick={getdocpdf()} className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                                    showpdf
                                                                </a> */}

                                                                {/* <span onClick={getdocpdf} className="badge badge-sm bg-gradient-secondary" value={doc.email}>show pdf</span> */}
                                                                <button onClick={getdocpdf} className="btn btn-dark" type="button" value={doc.email}>show pdf</button>


                                                                {/* <div className="col-5">
                                                                    <button onClick={getdocpdf} className="btn btn-dark " type="button" value={doc.email}>show pdf</button>
                                                                </div> */}
                                                            </td>
                                                            {/* <td className="align-middle text-center text-sm">


                                                                <button onClick={Changedocstatus} className="btn" value={doc.email} style={{ backgroundColor: "lightgreen", borderRadius: "20px", color: "black" }} type="button" >✔</button>


                                                            </td>
                                                            <td className="align-middle text-center text-sm">


                                                                <button onClick={Changedocstatus} className="btn" value={doc.email} style={{ backgroundColor: "red", borderRadius: "20px", color: "black" }} type="button" >✘</button>


                                                            </td> */}

                                                        </tr>
                                                    </>
                                                ))



                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>


    )
}

export default Displaydoc