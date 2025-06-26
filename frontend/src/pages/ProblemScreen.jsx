import React from 'react'
import ProfileNavbar from '../components/ProfileNavbar'


const ProblemScreen = () => {
  return (
    <>
    <div className=" w-[0rem] absolute -z-10 top-[40%] left-[20%] shadow-[0_0_200px_130px_#8212F9]"></div>
    <div className=" w-[0rem] absolute -z-10 top-[60%] left-[20%] shadow-[0_0_200px_100px_#12A8F9]"></div>

      <ProfileNavbar />
      
      <div className="h-[85vh] flex border-t border-t-gray-300">
        <div className="h-full w-[50%] border-r border-r-gray-300 ">


          <div className='problem_num  w-full h-[10%] p-1'>
            <h1 className='text-white font-[1000] text-2xl font-instrument '>Problem No: 12</h1>
          </div>
          <div className='problem_Statment border-b border-b-gray-300 w-full h-[60%] text-white font-[600] overflow-auto text-[15px] p-2'>
            <h3>
                The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
                The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
                The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
                The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
                The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
                The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
                The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
                The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
            </h3>
          </div>
          <div className='examples  overflow-auto p-2 w-full h-[30%]'>
            <h1 className='text-white font-[800]'>Examples :</h1>
            <div className='h-[50%] text-white p-3 mt-1 w-full '>
                <h1>Input:</h1>
                <h1>Output:</h1>
            </div>
            <div className='h-[50%] text-white p-3 mt-1 w-full '>
                <h1>Input:</h1>
                <h1>Output:</h1>
            </div>
          </div>

        </div>
        <div className="h-full overflow-auto w-[50%]  relative   ">

          
        </div>
      </div>
    </>
  )
}

export default ProblemScreen
