import React from 'react'
import {NavLink} from "react-router "

export default function LoginPage() {
  return (
    <div className='login'>
        <h1>WELCOME BACK</h1>
        <form onClick={submit}>
            <div>
                <label htmlFor="email">EMAIL ADDRESS</label>
                <input type="email"
                value={email}
                placeholder='Enter your email' 
                id='email'/>                
            </div>
            <div>
                <label htmlFor="password">PASSWORD</label>
                <input type="password"
                value={password}
                placeholder='Enter your password'
                id='password' />
            </div>
            <div className='descript'>
                Registration is free!{" "}
                <NavLink to="/register">CREATE AN ACCOUNT</NavLink>
            </div>

        </form>
    </div>
  )
}
