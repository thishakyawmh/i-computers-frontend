import './App.css'


function App() {
  return (
    <>
    <div className= "border w-[600px] h-[600px] bg-gray-400 relative">
      <div className='w-[500px] h-[500px] bg-yellow-100 flex flex-col justify-center items-center'>

        <div className='w-[100px] h-[100px] bg-blue-600'>
        </div>

        <div className='w-[100px] h-[100px] bg-red-600 fixed left-[550px] top-[550px]'>
        </div>

        <div className='w-[100px] h-[100px] bg-green-600'>
        </div>

        <div className='w-[100px] h-[100px] bg-pink-600 absolute right-[100px] bottom-[100px]'>
        </div>

      </div>
    </div>
    
    </>
  )
}

export default App
