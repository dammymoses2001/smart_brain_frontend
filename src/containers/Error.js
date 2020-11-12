import React from 'react'

import { Link } from 'react-router-dom'
function Error() {
    return (
        <div className='errorpage text-center'>
            <p className='text-center'>ooops something went wrong</p>
            <Link to='/index'>
                <button className='btn btn-dark'>Back</button></Link>
        </div >
    )
}

export default Error
