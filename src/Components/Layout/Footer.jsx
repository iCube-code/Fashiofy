import React from 'react'
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaBagShopping, FaGift, FaQuestion } from 'react-icons/fa6'
import { RxRocket } from "react-icons/rx";
import { GoMention } from "react-icons/go";
import Images from '../../assets/dev.svg'

const Footer = () => {
    return (
        <div className='total'>
            <div className='footerlist'>
                <div className='about'>
                    <h3>ABOUT</h3>
                    <h4>Contact Us</h4>
                    <h4>About Us</h4>
                    <h4>Careers</h4>
                    <h4>Fashiofy Stories</h4>
                    <h4>Press</h4>
                    <h4>Corporate Information</h4>
                </div>
                <div className='groupcompanies'>
                    <h3>GROUP COMPANIES</h3>
                    <h4>Myntra</h4>
                    <h4>Cleartrip</h4>
                    <h4>Shopsy</h4>
                </div>
                <div className='help'>
                    <h3>HELP</h3>
                    <h4>Payments</h4>
                    <h4>Shipping</h4>
                    <h4>Cancellation & Returns</h4>
                    <h4>FAQ</h4>
                </div>
                <div className='consumerpolicy'>
                    <h3>CONSUMER POLICY</h3>
                    <h4>Cancellation & Returns</h4>
                    <h4>Terms Of Use</h4>
                    <h4>Security</h4>
                    <h4>Privacy</h4>
                    <h4>Sitemap</h4>
                    <h4>Grievance Redressal</h4>
                    <h4>EPR Compilance</h4>
                </div>
                <div className='mail'>
                    <div className='mailus'>
                        <h3>Mail Us:</h3>
                        <h4>Fashiofy Internet Private Limited,</h4>
                        <h4>Buildings Alyssa,Begonia &</h4>
                        <h4>Clove Embassy Tech Village,</h4>
                        <h4>Outer Ring Road,</h4>
                        <h4> Bengaluru,560103,</h4>
                        <h4>Karnataka,India</h4>
                    </div>
                    <div className='social'>
                        <h3>Social:</h3>
                        <div className='icons'>
                            <FaFacebook />
                            <FaTwitter />
                            <FaYoutube />
                            <FaInstagram />
                        </div>
                    </div>
                </div>
                <div className='registeredofficeaddress'>
                    <h3>Registered Office Address:</h3>
                    <h4>Fashiofy Internet Private Limited,</h4>
                    <h4>Buildings Alyssa,Begonia & </h4>
                    <h4>Clove Embassy Tech Village,</h4>
                    <h4>Outer Ring Road,</h4>
                    <h4>Karnataka,India</h4>
                    <h4>CIN:U41900AD90589</h4>
                    <h4>Telephone:088 123456/0986690</h4>
                </div>
            </div>
            <div className='below'>
                <div className='seller'>
                    <FaBagShopping />
                    <h4>Become a Seller</h4>
                </div>
                <div className='advertise'>
                    <RxRocket />
                    <h4>Advertise</h4>
                </div>
                <div className='gift'>
                    <FaGift />
                    <h4>Gift Cards</h4>
                </div>
                <div className='question'>
                    <FaQuestion />
                    <h4>Help Center</h4>
                </div>
                <div className='oururl'>
                    <GoMention />
                    <h4>2007-2025 Fshiofy.com</h4>
                </div>
                <img src={Images} />
            </div>
        </div>



    )
}

export default Footer
