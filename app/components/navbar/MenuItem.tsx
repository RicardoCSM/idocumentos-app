'use client'

import React from "react";

interface MenuItemProps {
    onClick: () => void;
    label: string
    hidden?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label,
    hidden
}) => {
    return (
      <div
      onClick={onClick}
      className={`
        px-4
        py-3
        hover:bg-neutral-100
        transition
        font-semibold
        ${hidden ? 'block sm:hidden' : 'block'}
      `}>
        {label}
      </div>  
    )
}

export default MenuItem;