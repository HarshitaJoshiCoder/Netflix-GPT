import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptSearchSuggestions from './GptSearchSuggestions'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <>
    <div className='fixed -z-10'>
      <img className="w-screen h-screen object-cover"src = {BG_URL} alt = "img"></img>
    </div>
    <div className=''>
      <GptSearchBar />
      <GptSearchSuggestions />
    </div>
    </>
  )
}

export default GptSearch