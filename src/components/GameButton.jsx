import React from 'react';
export default function GameButton({children,onClick,style,variant='green',className='',...props}){
 return <button type="button" className={`game-button ${variant} ${className}`} style={style} onClick={onClick} {...props}><img className="button-shine" src={variant==='gold'?'/assets/556c1.svg':'/assets/7d5a4.svg'} alt=""/><img className="button-speck" src={variant==='gold'?'/assets/aba23.svg':'/assets/c97a9.svg'} alt=""/><span>{children}</span></button>;
}
