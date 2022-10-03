import React from 'react'
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope, faUser, faTableCells, faLaptopCode, faUsers} from '@fortawesome/free-solid-svg-icons'
import img from './logo.png'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'




const Header = (user) => {

console.log(user.auth)
  useEffect(() => {
    get();
  }, []);

  const [users, setUsers] = useState([])
  


  const get = () => {
  
    fetch(`${process.env.REACT_APP_API_ADRESS}getusers`)
      .then(response => response.json())
      .then((responseJson) => {
        
        setUsers(responseJson)
      })
      .catch(error => {
        console.log(error)
      })
  }

  


  return (
    <div className="HeaderContainer">

      <section className='logoContainer'>
      <NavLink to="/home"><img id="logo" src={img} alt="logo"/></NavLink>
      </section>
      
      <section className='dashboardIconContainer'>
        {!user.auth && 
          <>
            <FontAwesomeIcon id='categoriesIconNotLoggedIn' icon={faTableCells}/>
            <NavLink id='loginIcon' className="navLinkIcon" to="/login"><FontAwesomeIcon id='test' icon={faLaptopCode}/></NavLink>
            <NavLink id='registrationIcon' className="navLinkIcon" to="/register"><FontAwesomeIcon icon={faUsers}/></NavLink>
          </>
        }
        {user.auth &&
            <>
              <FontAwesomeIcon id='categoriesIconLoggedIn' icon={faTableCells}/>
              <NavLink id='profileIcon' className="navLinkIcon" to="/dashboard"><FontAwesomeIcon icon={faUser}/></NavLink>
            </>
        }
        <FontAwesomeIcon className="navLinkIcon" icon={faEnvelope}/>
      </section>
      
      <section className='dashBoardTextContainer'>
        <a class='text'>Kategorier</a>
        {!user.auth &&
          <>
            <NavLink className="NavLinkText text" title='testTitle' to="/login">Login</NavLink>
            <NavLink className="NavLinkText text" data-testid='testid' to="/register">Registrera</NavLink>
          </>
        }
        {user.auth && 
          <NavLink className="NavLinkText text" to="/dashboard">Profil</NavLink>
        }
        <a class='text'>Kontakt</a>
      </section>
      
      <section className='search'>
        <input
         type="text" 
         name='search' 
         placeholder="Sök tjänst här..." 
         />
        <button className='searchBtn text'>SÖK</button>
      </section>

      <section className='registeredUsersCount'>
        <p class='text'>Vi har för närvarande {users.users} registrerade användare!</p>
      </section>
      
    </div>
  )

}

export default Header