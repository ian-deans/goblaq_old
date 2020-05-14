import React from 'react';
import Link from 'next/link';

// About, FAQ, Add a Business, Newsletter, Contact

const MainNav: React.SFC = (props) => {
  return (
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
                    <Link href='/about'>
                        <a className="nav-link active">About</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href='/faq'>
                        <a className="nav-link active">FAQ</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href='/business'>
                        <a className="nav-link active">Add a Business</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href='/newsletter'>
                        <a className="nav-link active">Newsletter</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href='/contact'>
                        <a className="nav-link active">Contact</a>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  );
};

export default MainNav;
