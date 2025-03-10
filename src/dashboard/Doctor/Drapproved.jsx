import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function Drapproved() {
    var modal = document.getElementById("myModal");
    var start = document.getElementById("start");
    var [clickdata, setclickdata] = useState({});
    const token = localStorage.getItem('doctortoken');
    const myDecodedToken = jwtDecode(token);
    const navigate = useNavigate();
    const current = new Date();
    var curTime = "";
    var time = current.getHours();
    var minite = current.getMinutes();
    if (time >= 12) {
        if (time == 12) {
            curTime = `${time}:00 pm`
        }
        else {
            time = time - 12;
            curTime = `0${time}:00 pm`;
        }

    }
    else {
        if (curTime >= 10) {
            curTime = `${time}:00 am`;
        }
        else {
            curTime = `0${time}:00 am`;
        }

    }
    var hrplusminite = `${time}:${minite}`;
    var cdate = current.getDate();
    var cmonth = current.getMonth();
    if (cdate < 10) {
        cdate = `0${cdate}`

    }
    if (cmonth < 10) {
        cmonth = cmonth + 1;
        cmonth = `0${cmonth}`

    }
    var todaydate = `${current.getFullYear()}-${cmonth}-${cdate}`;
    var [doctor, setdoctor] = useState([]);
    var [state, setstate] = useState(false);
    const fetchdoctor = async () => {
        const res = await axios.post("https://doc-appointment-node-backend.onrender.com/findapprovedappointmentofdoctor", myDecodedToken.user);
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
        axios.post("https://doc-appointment-node-backend.onrender.com/changeapprovedappointmentstatus", data).then((res) => {
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
    function startmeeting(e, docname, docemail, patientname, patientnumber, patientemail, date, slot) {
        var data = { docname: docname, docmail: docemail, patientname: patientname, patientnumber: patientnumber, patientemail: patientemail, date: date, slot: slot };
        setclickdata(data);
        if (data.date == todaydate) {
            var slottime = data.slot;
            var timezoneofslot = (slottime.substring(6, 9));
            var temp1 = slottime.substring(0, 2);
            var slothr = Number(temp1);
            var temp2 = curTime.substring(0, 2);
            var numbercurtime = Number(temp2)
            var timezoneofcurtime = curTime.substring(6, 9);
            if (numbercurtime == slothr && numbercurtime < slothr + 1) {
                if (timezoneofcurtime == timezoneofslot) {
                    modal.style.display = "block";
                    start.style.filter = "blur(5px)";
                }
                else {
                    toast.info(`Start meeting on ${slottime} not ${hrplusminite} ${timezoneofcurtime}`)
                }

            }
            if (numbercurtime < slothr) {
                if (timezoneofcurtime != timezoneofslot) {
                    toast.error("You miss this meeting");
                    toast.info(`You had to start this meeting at ${data.slot} to ${slothr}:30 ${timezoneofslot} `);
                }
                else {
                    toast.error("Too early");
                    toast.info(`Start this meeting between ${data.slot} to ${slothr}:30 ${timezoneofslot} `);

                }
            }
            if (numbercurtime > slothr) {
                if (timezoneofcurtime != timezoneofslot) {
                    toast.error("Too early");
                    toast.info(`Start this meeting between ${data.slot} to ${slothr}:30 ${timezoneofslot} `);
                }
                else {
                    toast.error("You miss this meeting");
                    toast.info(`You had to start this meeting at ${data.slot} to ${slothr}:30 ${timezoneofslot} `);
                }

                // toast.info("for Rescheduling meeting go to missing appointment and re-schedual it");
            }

        }
        else {

            toast.error(`Today is not ${data.date} `);
        }
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            start.style.filter = "blur(0px)";
        }
    }

    const sendmail = async (e) => {
        console.log("i am call");
        localStorage.setItem('appointmentdata', JSON.stringify(clickdata));
    }

    return (
        <div>
            <div id="start">
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
                                                        <p className="text-sm mb-0 text-capitalize">Approved Appointment</p>
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
                                                        <h6 className="text-white text-capitalize ps-3">My Approved requestes</h6>
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
                                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Done</th>
                                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Start meeting</th>
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
                                                                                    <button onClick={(e) => startmeeting(e, doctor.docname, doctor.email, doctor.patientname, doctor.phonenumber, doctor.patientemail, doctor.date, doctor.slot)} className="btn badge badge-sm btn-info" value={doctor.email} type="button" >👍</button>
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
                <ToastContainer />
            </div>
            <div id="myModal" className="modal">
                <div id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Online Consultation</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p>
                                        Thank you for arriving on time.
                                    </p>
                                    <p>
                                        for start videocall click on start button.
                                    </p>
                                </div>
                                <div className="modal-footer pb-0">
                                    <a href='/videocall'><button onClick={(e) => sendmail(e)} className="btn badge badge-sm btn-primary" >Start</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Drapproved