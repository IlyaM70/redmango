import React from 'react'
import { useEffect,useState } from "react";
import { menuItemInterface } from "../../../../Interfaces";
import MenuItemCard from './MenuItemCard';

function MenuItemList() {
    
const [menuItems,setMenuItems] = useState<menuItemInterface[]>([]);

useEffect(()=>{
  fetch("https://redmangoapi12.azurewebsites.net/api/MenuItem")
  .then((response)=>response.json())
  .then((data)=>{
    console.log(data);
    setMenuItems(data.result)
  })
},[])


  return (
    <div className='container row'>
      {menuItems.length>0&& menuItems.map((menuItem, index)=>
      (
        <MenuItemCard menuItem={menuItem} key={index}/>
      ))}
    </div>
  )
}

export default MenuItemList



