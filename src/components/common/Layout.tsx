import React from 'react';

const Layout: React.SFC = (props) => {
  return (
    <div className='container-fluid page-home'>
        <div className='goblaq-main-page' />
        {props.children}
    </div>
  );
};

export default Layout;
