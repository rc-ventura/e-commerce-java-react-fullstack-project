import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          < Link className="navbar-brand" to="/">Admin Panel</Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <span>
              <NavLink className='btn btn-outline-light m-2 ' to="/home">Home</NavLink>
              <NavLink className='btn btn-outline-light m-2 ' to="/">Dashboard</NavLink>
              <NavLink className='btn btn-outline-light m-2 ' to="/addProduct">Add Product</NavLink>
              <NavLink className=  'btn btn-outline-light ' to="/addCategory">Add Category</NavLink>
          </span>

        </div>


      </nav>


    </div>
  )
}
