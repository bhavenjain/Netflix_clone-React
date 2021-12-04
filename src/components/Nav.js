import React, { useState, useEffect } from 'react'
import Avatar from '../public/avatar.png'
import '../public/css/nav.css'

function Nav () {
  const [show, handleShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true)
      } else handleShow(false)
    })
    return () => {
      window.removeEventListener('scroll', () => {})
    }
  })

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <img
        src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg'
        alt='Netflix'
        className='nav__logo'
      />

      <img src={Avatar} alt='avatar' className='nav__avatar' />
    </div>
  )
}

export default Nav
