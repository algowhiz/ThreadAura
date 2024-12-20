import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-700 text-gray-300 body-font">
                <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                        <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                            <Image width={200} height={40} src="/threadAura.png" alt="ThreadAura" />
                        </a>
                        <p className="mt-2 text-sm">Discover premium quality and fashionable apparel at ThreadAura.</p>
                    </div>
                    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                        {/* Customer Service Links */}
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-white tracking-widest cursor-pointer text-sm mb-3">CUSTOMER SERVICE</h2>
                            <nav className="list-none mb-10">
                                <li><a className="text-gray-400 cursor-pointer  hover:text-white">Contact Us</a></li>
                                <li><a className="text-gray-400 cursor-pointer  hover:text-white">Shipping & Returns</a></li>
                                <li><a className="text-gray-400 cursor-pointer  hover:text-white">FAQs</a></li>
                                <li><a className="text-gray-400 cursor-pointer  hover:text-white">Size Guide</a></li>
                            </nav>
                        </div>
                        {/* About Us Links */}
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-white tracking-widest cursor-pointer text-sm mb-3">ABOUT US</h2>
                            <nav className="list-none mb-10">
                                <li><a className="text-gray-400 cursor-pointer  hover:text-white">Our Story</a></li>
                                <li><a className="text-gray-400 cursor-pointer  hover:text-white">Sustainability</a></li>
                                <li><a className="text-gray-400 cursor-pointer  hover:text-white">Careers</a></li>
                                <li><a className="text-gray-400 cursor-pointer  hover:text-white">Blog</a></li>
                            </nav>
                        </div>
                        {/* Follow Us Links */}
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-white tracking-widest cursor-pointer text-sm mb-3">FOLLOW US</h2>
                            <nav className="list-none mb-10">
                                <li><a href="https://facebook.com" className="text-gray-400 cursor-pointer  hover:text-white" aria-label="Facebook">Facebook</a></li>
                                <li><a href="https://instagram.com" className="text-gray-400 cursor-pointer  hover:text-white" aria-label="Instagram">Instagram</a></li>
                                <li><a href="https://twitter.com" className="text-gray-400 cursor-pointer  hover:text-white" aria-label="Twitter">Twitter</a></li>
                                <li><a href="https://pinterest.com" className="text-gray-400 cursor-pointer  hover:text-white" aria-label="Pinterest">Pinterest</a></li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-white tracking-widest cursor-pointer text-sm mb-3">JOIN OUR TEAM</h2>
                            <nav className="list-none mb-10">
                                <li><a href="/delivery/login" className="text-gray-400 cursor-pointer hover:text-white">Delivery Boy Login</a></li>
                            </nav>
                        </div>

                    </div>
                </div>
                <div className="bg-gray-800">
                    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-gray-400 text-sm text-center sm:text-left">© {new Date().getFullYear()} ThreadAura — All Rights Reserved</p>
                        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                            {/* Social Media Icons */}
                            <a href="https://facebook.com" className="text-gray-400" aria-label="Facebook">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                            <a href="https://twitter.com" className="ml-3 text-gray-400" aria-label="Twitter">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                            </a>
                            <a href="https://instagram.com" className="ml-3 text-gray-400" aria-label="Instagram">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                            <a href="https://pinterest.com" className="ml-3 text-gray-400" aria-label="Pinterest">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
