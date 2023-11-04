import { Gamepad } from 'lucide-react'
import React from 'react'

const Heading = () => {
  return (
    <div className='px-5 py-4 flex items-center justify-between'>
        <div className='flex items-center'>
            <Gamepad className='mr-2' /> <h3 className='font-bold'>Games</h3>
        </div>
    </div>
  )
}

export default Heading