import React from 'react'
import { TableStudentSchedule } from './components/TableScheduleStudent'

const Home = () => {
  return (
    <div>
      <div className="flex justify-between">
      <h1 className="text-2xl font-bold text-center text-gray-800">Historial</h1>
      </div>
      <div className='mt-10'>
        <TableStudentSchedule />
      </div>
      
    </div>
  )
}

export default Home
