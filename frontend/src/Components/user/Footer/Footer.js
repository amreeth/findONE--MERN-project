import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='border text-center text-white'>
      <div className='container p-4 pb-0 text-end' >
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
      <div className='text-center px-3 mt-5 pt-5' >
        © 2020 Copyright:
        <a className='mx-3 text-decoration-none' >
          AMREETH ASOK
        </a>
      </div>
    </MDBFooter>
  );
}