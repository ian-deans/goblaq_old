/* Test */
import React from "react";
import Link from "next/link";

import { SearchBar } from "~/components/businesses/Search";
import { PopularPlaces } from "../src/components/businesses/PopularPlaces/PopularPlaces";
import { CategorySearchLinks } from "../src/components/businesses/categories/CategorySearchLinks";


const Test: React.SFC = (props: any) => {
    return (
        <div className='container-fluid page-home'>
            <div className='goblaq-main-page' />
            <div className='row'>
                <div className="col-md-2">
                    <Link href='/'>
                        <a className="navbar-brand">
                            <img
                                src="/images/navbar_logo_transparent.png"
                                alt="goblaq logo"
                            />
                        </a>
                    </Link>
                </div>
                <div className="col-md-10">
                    <ul className="nav justify-content-end goblaq-main-nav">
                        <li className="nav-item active">
                            <Link href='/'>
                                <a className="nav-link active">Home</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/'>
                                <a className="nav-link active">Forum</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/about'>
                                <a className="nav-link active">About</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/'>
                                <a className="nav-link active">Add Listing</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/'>
                                <a className="nav-link active">Sign In</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/'>
                                <a className="nav-link active">Sign Up</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/'>
                                <a className="nav-link active">Become an Affiliate</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="jumbotron-fluid goblaq-main-banner">
                <div className="col-md">
                    <h1 className="display-4 goblaq-main-banner-title">Discover More</h1>
                    <p className="lead goblaq-main-banner-lead">experiences within the Black Community</p>
                </div>
            </div>
            <div className="row justify-content-md-center goblaq-search">
                <div className="col-md-10">
                    <div className="flex-row justify-content-center goblaq-search-fields">
                        <SearchBar />
                    </div>
                    <div className="flex-row justify-content-center goblaq-search-categories">
                        <CategorySearchLinks {...props} />
                    </div>
                    <div className="flex-row justify-content-center goblaq-search-popular-places">
                        <PopularPlaces top3={true} />
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <div className="row justify-content-md-center flex-wrap goblaq-main-footer">
                <div className="col-md-3 col-sm-1 goblaq-main-footer-logo">
                    <Link href='/'>
                        <a className="navbar-brand">
                            <img
                                src="/images/navbar_logo_transparent.png"
                                alt="goblaq logo"
                            />
                        </a>
                    </Link>
                    <h6>Made with &#x2764; in Texas and California</h6>
                </div>
                <div className="col-md-3 d-flex flex-column">
                    <h4>Quick Links</h4>
                    <div className="row">
                        <div className="col">
                            <ul className="nav flex-column goblaq-footer-links">
                                <li className="nav-item">
                                    <Link href="">
                                        <a>Home</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="">
                                        <a>Forums</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="">
                                        <a>Explore</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="">
                                        <a>Affiliates</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col">
                            <ul className="nav flex-column goblaq-footer-links">
                                <li className="nav-item">
                                    <Link href="">
                                        <a>About Us</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="">
                                        <a>Pricing</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="">
                                        <a>Terms</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="">
                                        <a>Condition</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 d-flex flex-column align-items-end">
                    <h4>Contact Us</h4>
                    <ul className="nav flex-column goblaq-footer-contact-info">
                        <li>Phone</li>
                        <li>Email</li>
                        <li>Houston, Texas</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Test;
