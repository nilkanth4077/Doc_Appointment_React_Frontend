import React from 'react'
import logo from '../assets/img/images.png';
function Footer() {
    return (
        <div>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="footer_section_title">
                                <h4>Site Navigation</h4>
                            </div>
                            <ul className="footer_menu_lists">
                                <li><a href="index.php" target="_blank">Home</a></li>
                                <li><a href="services.php" target="_blank">services</a></li>
                                <li><a href="doctor-home.php" target="_blank">Doctor's Page</a></li>
                                <li><a href="patient-home.php" target="_blank">Patient Page</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="footer_section_title">
                                <h4>Terms of Use</h4>
                            </div>
                            <ul className="footer_menu_lists">
                                <li><a href="QupPrivacy_Policy.html" target="_blank">Privacy Policy</a></li>
                                {/* <!-- <li><a href="javascript:void(0);" target="_blank">Disclaimer</a></li> --> */}
                                <li><a href="terms-conditions.html" target="_blank">Terms and Conditions</a></li>
                                <li><a href="Refund.html" target="_blank">Refund Policy</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-6">
                            <div className="footer_section_title">
                                <h4>Quick Links</h4>
                            </div>
                            <ul className="footer_menu_lists">
                                <li><a href="blog.php" target="_blank">Blog</a></li>
                                <li><a href="career.php" target="_blank">Career</a></li>
                                <li><a href="about_us.php" target="_blank">About Us</a></li>
                                <li><a href="contact.php" target="_blank">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-6">
                            <img src={logo} style={{ borderRadius: "40px", height: "60px", width: "60px" }} className="img-fluid mb-2" alt="India’s best doctor healthcare app solution provider" />

                            <ul className="info_list">
                                <li>
                                    <div className="">
                                        <div className="p-0"><i className="fas fa-map-marker-alt me-1"></i> <b>Address:</b>
                                        </div>
                                        <div className=""> <a href="https://goo.gl/maps/FUHLVp4GBdF4RCKr5" style={{ textDecoration: "none" }}> WeWork Futura, Sr No 133(P),
                                            CTS No 4944, Magarpatta Rd, Kirtane Baugh, Hadpsar, Pune 411028 </a></div>
                                    </div>
                                </li>
                                <li>
                                    <ul className="social_media_links">
                                        <li><a href="https://www.facebook.com/quphealthapp" target="_blank" rel="noopener noreferrer" ><i
                                            className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="https://www.instagram.com/qupindia/" target="_blank" rel="noopener noreferrer"><i
                                            className="fab fa-instagram"></i></a></li>
                                        <li><a href="https://twitter.com/qupindia" target="_blank" rel="noopener noreferrer"><i
                                            className="fab fa-twitter"></i></a></li>
                                        <li><a href="https://www.linkedin.com/company/qupapp/mycompany/?viewAsMember=true" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="scroll-top" data-scroll="up" type="button">
                        <a><i className="fas fa-angle-up"></i></a>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="offset-lg-3 col-lg-6">
                            <p className="copyright">copyright &#169; 2022-23 Q UP</p>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer