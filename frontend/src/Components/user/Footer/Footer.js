import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon
} from 'mdb-react-ui-kit';
import "./Footer.css"
export default function Footer() {
  return (
    <MDBFooter className=' text-center text-white mt-5'>
      <div className='container  pb-0 text-end' >
        <section className='mb-4 ' style={{position:"fixed",top:"10rem",right:0,display:"flex",flexDirection:"column"}}>
          <a
            className='btn border-0 btn-primary  m-1'
            style={{ backgroundColor: '#3b5998' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='facebook-f' />
          </a>

          <a
            className='btn border-0  btn-primary btn-floating m-1'
            style={{ backgroundColor: '#55acee' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='twitter' />
          </a>

          <a
            className='btn border-0 btn-primary btn-floating m-1'
            style={{ backgroundColor: '#dd4b39' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='google' />
          </a>
          <a
            className='btn border-0 btn-primary btn-floating m-1'
            style={{ backgroundColor: '#ac2bac' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='instagram' />
          </a>

        </section>
      </div>
      <div className='text-center px-3 ' style={{color:"black"}}>
        <p className='text-center px-3 copyright-text'>Copyright © 2022 findOne. All Rights Reserved</p>
        
      </div>
    </MDBFooter>
  );
}