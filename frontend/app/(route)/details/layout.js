import React from 'react';

function layout({ children }) {
    return (
        <div className='h-screen' >
            {children}
        </div>
    );
}

export default layout;