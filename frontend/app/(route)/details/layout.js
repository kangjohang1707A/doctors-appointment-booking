import React from 'react';

function layout({ children }) {
    return (
        <div className='lg:h-screen' >
            {children}
        </div>
    );
}

export default layout;