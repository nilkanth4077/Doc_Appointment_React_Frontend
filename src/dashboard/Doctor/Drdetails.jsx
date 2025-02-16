import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";

function Drdetails() {
    var [docdata, setdocdata] = useState({});
    var [loader, setloader] = useState(true);
    const [changedetails, setchangedetails] = useState({ fullname: "", email: "", phonenumber: "", slot1time: "", slot2time: "", slot3time: "", slot4time: "" })
    const { fullname, phonenumber, email, slot1time, slot2time, slot3time, slot4time } = changedetails;
    var data;
    const fetch = async () => {
        const token = localStorage.getItem('doctortoken');
        const myDecodedToken = jwtDecode(token);
        data = myDecodedToken.user;
        // setdocdata(data);
        await axios.post("https://doc-appointment-node-backend.onrender.com/finddocemail", myDecodedToken.user).then((res) => {
            setdocdata(res.data.docinfo);
            var fetchdata = res.data.docinfo;
            setchangedetails({
                fullname: fetchdata[0].fullname,
                email: fetchdata[0].email,
                phonenumber: fetchdata[0].phonenumber,
                slot1time: fetchdata[0].slot1time,
                slot2time: fetchdata[0].slot2time,
                slot3time: fetchdata[0].slot3time,
                slot4time: fetchdata[0].slot4time,

            })
        })
    }
    const setdetails = async () => {
        setchangedetails({
            fullname: data.fullname,
            email: data.email,
            phonenumber: data.phonenumber,
            slot1time: data.slot1time,
            slot2time: data.slot2time,
            slot3time: data.slot3time,
            slot4time: data.slot4time,
        })
    }
    useEffect(() => {
        setTimeout(() => {
            setloader(false);
        }, 1000)
        fetch();
        setdetails();
    }, []);

    const handleinput = (e) => {
        setchangedetails({ ...changedetails, [e.target.name]: e.target.value });
    }
    const savechanges = async (e) => {
        if (changedetails.slot1time == changedetails.slot2time && changedetails.slot1time == changedetails.slot3time && changedetails.slot1time == changedetails.slot4time) {
            toast.error("All slots are must different from each other");
        }
        await axios.post("https://doc-appointment-node-backend.onrender.com/changes", changedetails).then((res) => {
            if (res.data.message == "ok") {
                toast.success("Updates successfully");
                setTimeout(() => {
                    window.location.reload()
                }, 1100);

            }
            if (res.data.message == "err") {
                toast.error("Sometinr went wrong");
            }
        })
    }



    return (
        <div>
            {loader ? (
                <>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary " role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                </>
            ) : (<>
                <div>
                    <div className="container-fluid py-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="container">
                                    <div className="main-body">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="d-flex flex-column align-items-center text-center">
                                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
                                                            <div className="mt-3">
                                                                <h4 className="text-uppercase">{docdata.fullname}</h4>
                                                                <p className="text-secondary mb-1">{docdata.email}</p>
                                                                {/* <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p> */}
                                                                <button className="btn btn-primary">Follow</button>
                                                                <button className="btn btn-outline-primary">Message</button>
                                                            </div>
                                                        </div>
                                                        <hr className="my-4" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Dr.Name</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input onChange={(e) => handleinput(e)} name='fullname' value={docdata[0].fullname} type="text" className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Email</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input onChange={(e) => handleinput(e)} name='email' value={docdata[0].email} type="text" className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Phone</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input onChange={(e) => handleinput(e)} name='phonenumber' value={docdata[0].phonenumber} type="text" className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Slot1</h6>
                                                            </div>
                                                            <div className="col-sm-3 text-secondary">
                                                                <select onChange={e => handleinput(e)} name="slot1time" className="form-select form-control" id="mce-MMERGE2">
                                                                    <option value={docdata.slot1time}>Curr. {docdata[0].slot1time}</option>
                                                                    <option value="9:00 am">9:00 am</option>
                                                                    <option value="10:00 am">10:00 am</option>
                                                                    <option value="11:00 am">11:00 am</option>
                                                                    <option value="12:00 pm">12:00 pm</option>
                                                                    <option value="1:00 pm">1:00 pm</option>
                                                                    <option value="2:00 pm">2:00 pm</option>
                                                                    <option value="3:00 pm">3:00 pm</option>
                                                                    <option value="4:00 pm">4:00 pm</option>
                                                                    <option value="5:00 pm">5:00 pm</option>
                                                                    <option value="6:00 pm">6:00 pm</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Slot2</h6>
                                                            </div>
                                                            <div className="col-sm-3 text-secondary">
                                                                <select onChange={e => handleinput(e)} name="slot2time" className="form-select form-control" id="mce-MMERGE2">
                                                                    <option value={docdata.slot2time}>Curr. {docdata[0].slot2time}</option>
                                                                    <option value="9:00 am">9:00 am</option>
                                                                    <option value="10:00 am">10:00 am</option>
                                                                    <option value="11:00 am">11:00 am</option>
                                                                    <option value="12:00 pm">12:00 pm</option>
                                                                    <option value="1:00 pm">1:00 pm</option>
                                                                    <option value="2:00 pm">2:00 pm</option>
                                                                    <option value="3:00 pm">3:00 pm</option>
                                                                    <option value="4:00 pm">4:00 pm</option>
                                                                    <option value="5:00 pm">5:00 pm</option>
                                                                    <option value="6:00 pm">6:00 pm</option>
                                                                </select>
                                                            </div>

                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Slot3</h6>
                                                            </div>
                                                            <div className="col-sm-3 text-secondary">

                                                                <select onChange={e => handleinput(e)} name="slot3time" className="form-select form-control" id="mce-MMERGE2">
                                                                    <option value={docdata.slot3time}>Curr. {docdata[0].slot3time}</option>
                                                                    <option value="9:00 am">9:00 am</option>
                                                                    <option value="10:00 am">10:00 am</option>
                                                                    <option value="11:00 am">11:00 am</option>
                                                                    <option value="12:00 pm">12:00 pm</option>
                                                                    <option value="1:00 pm">1:00 pm</option>
                                                                    <option value="2:00 pm">2:00 pm</option>
                                                                    <option value="3:00 pm">3:00 pm</option>
                                                                    <option value="4:00 pm">4:00 pm</option>
                                                                    <option value="5:00 pm">5:00 pm</option>
                                                                    <option value="6:00 pm">6:00 pm</option>
                                                                </select>
                                                            </div>

                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Slot4</h6>
                                                            </div>
                                                            <div className="col-sm-3 text-secondary">

                                                                <select onChange={e => handleinput(e)} name="slot4time" className="form-select form-control" id="mce-MMERGE2">
                                                                    <option value={docdata.slot4time}>Curr. {docdata[0].slot4time}</option>
                                                                    <option value="9:00 am">9:00 am</option>
                                                                    <option value="10:00 am">10:00 am</option>
                                                                    <option value="11:00 am">11:00 am</option>
                                                                    <option value="12:00 pm">12:00 pm</option>
                                                                    <option value="1:00 pm">1:00 pm</option>
                                                                    <option value="2:00 pm">2:00 pm</option>
                                                                    <option value="3:00 pm">3:00 pm</option>
                                                                    <option value="4:00 pm">4:00 pm</option>
                                                                    <option value="5:00 pm">5:00 pm</option>
                                                                    <option value="6:00 pm">6:00 pm</option>
                                                                </select>
                                                            </div>

                                                        </div>
                                                        {/* <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Mobile</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input type="text" className="form-control" value="(320) 380-4539" />
                                                            </div>
                                                        </div> */}
                                                        {/* <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Address</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input type="text" className="form-control" value="Bay Area, San Francisco, CA" />
                                                            </div>
                                                        </div> */}
                                                        <div className="row">
                                                            <div className="col-sm-3"></div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <button onClick={(e) => savechanges(e)} className="btn btn-primary">Save Changes</button>
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
                    <ToastContainer />
                </div>
            </>)}
        </div>
    )
}

export default Drdetails