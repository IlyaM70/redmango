import React from 'react'
import { menuItemInterface } from '../../../../Interfaces'

interface Props{
    menuItem:menuItemInterface;
}

function MenuItemCard(props: Props) {
  return (
    <div>{props.menuItem.name}</div>
  )
}

export default MenuItemCard