import React, { useState } from "react"

function Header() {
  const [open, setOpen] = useState(false)
  

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Header>
      <h2>Logo</h2>
     
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
      
    </Header>
  )
}

export default Header