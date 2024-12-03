import React from 'react'
import Schedule from './components/Schedule'

const Home = () => {
  return (
    <div>
        <div className="">
        <h1 className="text-2xl font-bold text-center text-slate-300">
        Agendar
        </h1>
            <Schedule />
        </div>
    </div>
  )
}

export default Home
