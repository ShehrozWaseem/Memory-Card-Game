import React from 'react'
import './singlecard.css'


function SingleCard({card,handleChoice,flipped,disabled}) {

//2
const handleClick = () =>{
  if(!disabled){
    handleChoice(card)
  }
    
}
//
  return (
      //1
    <div className='card'>
        <div className={flipped?"flipped":""}>
        <img className='front' src={card.src} alt='card item'/>
        <img className='back' onClick={handleClick} src="/img/cover.png" alt='back cover'/>
        </div>
    </div>
    //1

  )
}

export default SingleCard