import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#000] text-white'>
        <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-2">
            <h1 className='lg:text-4xl text-3xl md:mb-6 lg:leading-normal font-semibold md:w-2/5'>
                <span className='text-[#56d879]'>
                    Subscribe 
                    {" "} Us
                </span>
                

            </h1>
            <div className="">
                <input type="text" required placeholder='Enter Your Email...' 
                className='text-gray-800  bg-white sm:w-71 w-full sm:mr-5 mr-1 lg:mb-8 mb-4 py-2.5 rounded px-2 focus:outline-none' />
                <button className='bg-[#56dB79] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full'>
                    Submit

                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
            <ul className='px-5 text-center sm:text-start flex sm:block flex-col items-center'>
                <img src="https://res.cloudinary.com/dflbje6qn/image/upload/v1756942450/download_18_vprvfq.jpg" alt="" style={{filter: "brightness(0) invert(1)"}} />
            </ul>
            <br />
            <p>mUNTHASUHF .</p>
        </div>
    </div>
  )
}

export default Footer
