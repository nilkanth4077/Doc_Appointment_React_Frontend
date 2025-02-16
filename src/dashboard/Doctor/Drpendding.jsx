import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";

function Drpendding() {
    var [doctor, setdoctor] = useState([]);
    var [state, setstate] = useState(false);
    const fetchdoctor = async () => {
        const token = localStorage.getItem('doctortoken');
        const myDecodedToken = jwtDecode(token);
        const res = await axios.post("https://doc-appointment-node-backend.onrender.com/findpendingappointmentofdoctor", myDecodedToken.user);
        const doctorappo = await res.data.docinfo
        setdoctor(doctorappo);

    };
    useEffect(() => {
        fetchdoctor();
    }, []);
    useEffect(() => {
        fetchdoctor();
    }, [state]);

    function Changeappointmentstatus(e, docname, docemail, patientname, patientnumber, patientemail, date, slot) {
        var data = { docname: docname, docmail: docemail, patientname: patientname, patientnumber: patientnumber, patientemail: patientemail, date: date, slot: slot };
        axios.post("https://doc-appointment-node-backend.onrender.com/changependingappointmentstatus", data).then((res) => {
            if (res.data.message === "ok") {
                // console.log("if called");
                toast.success("Status change successfully");
                if (state == true) {
                    setstate(false);
                }
                else {
                    setstate(true);
                }
            }
            if (res.data.message === "error") {
                toast.error("Someting went wrong");
            }
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
                                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                        <div className="card">
                                            <div className="card-header p-3 pt-2">
                                                <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                                                    <i className="material-icons opacity-10">person</i>
                                                </div>
                                                <div className="text-end pt-1">
                                                    <p className="text-sm mb-0 text-capitalize">Pendding Appointment</p>
                                                    <h4 className="mb-0">{doctor.length}</h4>
                                                </div>
                                            </div>
                                            <hr className="dark horizontal my-0" />

                                        </div>
                                    </div>

                                </div>



                            </div >
                            <div className="container-fluid py-4">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card my-4">
                                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                                    <h6 className="text-white text-capitalize ps-3">My Pendding requestes</h6>
                                                </div>
                                            </div>
                                            <div className="card-body px-0 pb-2">
                                                <div className="table-responsive p-0">
                                                    <table className="table align-items-center mb-0">
                                                        <thead>
                                                            <tr>

                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">PatientName</th>
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">P. Mobilenumber</th>
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Date</th>
                                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Time</th>
                                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Approved</th>
                                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                doctor.map(doctor => (
                                                                    <>
                                                                        <tr >

                                                                            <td>
                                                                                <div className="d-flex px-2 py-1">
                                                                                    <div className="d-flex flex-column justify-content-center">
                                                                                        <h6 className="mb-0 text-sm">{doctor.patientname}</h6>
                                                                                        <p className="text-xs text-secondary mb-0">{doctor.patientemail}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <h6 className=" text-sm font-weight-bold mb-0" style={{ fontSize: "20px" }}>{doctor.phonenumber}</h6>
                                                                            </td>
                                                                            <td>
                                                                                <h6 className=" text-sm font-weight-bold mb-0" style={{ fontSize: "20px" }}>{doctor.date}</h6>
                                                                            </td>
                                                                            <td>
                                                                                <h6 className=" text-sm font-weight-bold mb-0" style={{ fontSize: "20px" }}>{doctor.slot}</h6>
                                                                            </td>
                                                                            <td className="align-middle text-center text-sm">
                                                                                <span className="badge badge-sm bg-gradient-success">{doctor.appointmentstatus}</span>
                                                                            </td>
                                                                            <td className="align-middle text-center text-sm">
                                                                                <button onClick={(e) => Changeappointmentstatus(e, doctor.docname, doctor.email, doctor.patientname, doctor.phonenumber, doctor.patientemail, doctor.date, doctor.slot)} className="btn badge badge-sm btn-success" value={doctor.email} type="button" >✔</button>
                                                                            </td>
                                                                            <td className="align-middle text-center text-sm">
                                                                                <button className="btn badge badge-sm btn-danger" value={doctor.email} type="button" >✘</button>
                                                                            </td>

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Drpendding