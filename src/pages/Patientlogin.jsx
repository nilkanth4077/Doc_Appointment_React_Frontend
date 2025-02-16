// import img1 from '../images/stath.jpg';
import Header from './Header';
import Footer from './Footer';
// import css from '../images/patientreg.css';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import axios, { isCancel, AxiosError } from 'axios';
import { Link, useNavigate } from "react-router-dom";




const Patientlogin = () => {

  const [patientdetails, setdetails] = useState({
    email: "", password: ""
  })
  const { email, password } = patientdetails;
  const handleInput = (e) => {
    setdetails({ ...patientdetails, [e.target.name]: e.target.value });
  }
  const navigate = useNavigate();

  const submit = async e => {
    if (patientdetails.email == "" || patientdetails.password == "") {
      toast.error("Fill up details !");
    }
    else {
      // console.log("submit call");
      e.preventDefault();

      await axios.post("http://localhost:8080/patientlogin", patientdetails).then((res) => {
        //console.log(res);
        if (res.data.message === "ok") {

          localStorage.setItem('patienttoken', res.data.token);
          toast.success("Login Successful");
          setTimeout(() => {
            navigate('/index');
          }, 1200)


          //toast.info("Now You can login with your email and pass");
        }
        if (res.data.message === "don'tmatch") {
          toast.error("Email or password not match");
          //toast.info("Now You can login with your email and pass");
        }
        if (res.data.message === "error") {
          toast.error("User not exists");
        }
        // if (res.data.message === "Exists") {
        //   toast.error("User already exist on this email");
        // }


      });
    }
  }
  const styles = {
    imageabc: {
      height: "100%",
      backgroundImage: `url(${"4.jpg"})`,
      backgroundSize: 'cover',
      backgroundPosition: 'left',
      filter: ` blur(8px)`


    }
  }
  const bdcontent = {
    backgroundColor: "rgb(0,0,0)", /* Fallback color */
    backgroundColor: "rgba(0,0,0, 0.4)", /* Black w/opacity/see-through */
    color: `white`,
    fontWeight: `bold`,
    border: `3px`,
    borderRadius: "50px",
    position: `absolute`,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    zIndex: `2`,
    width: `80%`,
    padding: `20px`,

  }
  return (
    <>
      <div style={styles.imageabc}></div>
      <div style={bdcontent}>
        <section className="home-banner">

          <div className="container">
            <div className="row">
              <div className=" col-4  d-flex align-items-center">
                <div className="banner_title" data-animation="fadeInLeft" animation-delay="2s" data-delay="0.3s">
                  <h1>My Online Address<br /><span>My Digital Clinic</span></h1>
                  <p className="py-3">Establish medical practice online and grow it digitally, easing clinic management.
                  </p>
                </div>
              </div>
              <div className="container col-6 mt-lg-5"  >
                <div className=" px-xl-5">
                  <div className="lead_magnet_form_wrapper">
                    <div className="form_title">
                      <h4 className="sub_heading">Login Here :</h4>
                      <h3 className="heading mb-2 pb-1">Fill details</h3>
                    </div>
                    <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7_dtp.css" rel="stylesheet" type="text/css" />

                    <div id="">
                      <form >
                        <div id="mc_embed_signup_scroll">


                          <div className="mc-field-group form-group">
                            <label htmlFor="mce-EMAIL" className="mb-1 mt-3">Email Address *<span
                              className="asterisk"></span></label>
                            <input type="email" name="email" value={email} onChange={(e) => handleInput(e)} className="email form-control"
                              id="mce-EMAIL" required="true" />
                          </div>
                          <div className="mc-field-group form-group">
                            <label htmlFor="mce-MMERGE1" className="mb-1 mt-3">Password *</label>
                            <input type="password" name="password" value={password} onChange={(e) => handleInput(e)} className="form-control" id="mce-MMERGE1" required="true" />
                          </div>
                          <div id="mce-responses" className="clear foot">
                            <div className="response" id="mce-error-response" style={{ display: NaN }}></div>
                            <div className="response" id="mce-success-response" style={{ display: NaN }}></div>
                          </div>
                          <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true"><input type="text" name="b_dd80eb08d9cc3b8010abc039f_34a0b4f4e9" tabindex="-1" value="" /></div>
                          <div className="row">
                            <div className=" col-3 optionalParent">
                              <div className="clear foot pt-4 ">
                                <input type="submit" onClick={submit}
                                  id="mc-embedded-subscribe"
                                  className="button btn btn-success bt mt-5 get_demo_btn" />

                              </div>
                            </div>
                            <div className=" col-3 optionalParent">
                              <div className="clear foot pt-4 pl-10 ">
                                <Link className="button btn btn-primary bt " style={{ textDecoration: "none" }} to="/">Home</Link>
                              </div>
                            </div>
                            <div className=" col-5 optionalParent">
                              <div className="clear foot pt-4 pl-10 ">
                                <Link className="button btn btn-info bt " style={{ textDecoration: "none" }} to="/doclogin">I'm Doctor !!</Link>
                              </div>
                            </div>
                          </div>


                        </div>
                      </form><br />
                      <Link style={{ textDecoration: "none" }} to="/patientreg">Create an account?</Link>
                    </div>


                  </div>
                </div>
              </div>


            </div>



          </div>


        </section >

        <ToastContainer />
      </div >

    </>





  )
}

export default Patientlogin