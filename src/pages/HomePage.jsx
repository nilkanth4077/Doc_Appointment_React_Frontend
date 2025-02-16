import React from 'react'

const HomePage = () => {
    console.log('i am call');
    return (
        <div>
            <section className="home_banner">
                <div className="banner_image_back">
                    <img src="assets/img/doctor-1.jpg" alt="Best Online Doctor Consultation App for HealthCare or Clinic"
                        className="img-fluid vector_desktop" />
                    <img src="assets/img/doctor-4.jpg" alt="Best Online Doctor Consultation App for HealthCare or Clinic"
                        className="img-fluid vector_mobile" />
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="download_app_btn download_app_btn_left">
                            <a href="/patientlogin" target="_self" style={{ textDecoration: "none" }} >I'm Patient</a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="download_app_btn download_app_btn_right doc_btn_brd">
                            <a href="/doclogin" target="_self" style={{ textDecoration: "none" }}>I'm Doctor</a>
                        </div>
                    </div>
                </div>
            </section>
            <div className="whatsapp-cta-container">
                <a href="/adminlogin" target="_blank" rel="noopener noreferrer" >A</a>
            </div>


        </div>

    );
}

export default HomePage