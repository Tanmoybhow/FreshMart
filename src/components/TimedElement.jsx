import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';

const TimedElement = ({showElement,setShowElement,elementTrue}) => {
  useEffect(() => {
    // Show the element
    setShowElement(elementTrue);

    // Remove the element after 3 seconds
    const timer = setTimeout(() => {
      setShowElement(false);
    }, 3000);

    // Cleanup function to clear timeout if component unmounts
    return () => clearTimeout(timer);
  }, []);

  return createPortal(
    <div className='w-[300px] h-auto absolute top-16 left-2'>
      {showElement && <p className='bg-red-500 text-white py-4 px-6 rounded-sm'>Hello i will dissaper</p>}
    </div>,
    document.getElementById('timedElement')
  )
}

export default TimedElement
