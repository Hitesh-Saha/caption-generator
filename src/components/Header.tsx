import CaptiAILogo from '../assets/CaptiAILogo.png';

const Header = () => {
  return (
    <div className="bg-blue-500 p-3 flex gap-3 items-center">
        <img src={CaptiAILogo} className='rounded-full h-8 w-8'/>
        <h1 className='text-2xl text-white font-extrabold uppercase italic'>CaptiAI</h1>
    </div>
  )
}

export default Header