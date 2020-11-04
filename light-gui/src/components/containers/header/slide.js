import React from 'react';

// import imagem from '../../imgs/bg4.jpg'

const masterSlide = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('./imgs/bg4.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
}

export default function Slide(){
    return(
            <header style={masterSlide}>
                <div className='h-100' style={{ background: 'rgba(0,0,0,0.4)'}}>
                    <div className='row'>
                        <div className='col-12'>
                        </div>
                    </div>
                </div>
            </header>
    )
}