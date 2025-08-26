import { useState } from 'react';
import './App.css';
import SidebarToggle from './components/icons/SidebarToggle';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Start open in desktop mode

  return (
    <div className='flex items-stretch min-h-screen relative'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <MainContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  );
}

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Desktop Sidebar (Conditional) */}
      {sidebarOpen && (
        <div className='w-72 bg-red-500 p-4 overflow-y-auto hidden md:block'>
          <div
            className='cursor-pointer hover:bg-slate-200 p-2 rounded'
            onClick={() => setSidebarOpen(false)}
          >
            <SidebarToggle />
          </div>
        </div>
      )}

      {/* Mobile Sidebar (Slide In) */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-red-500 p-4 overflow-y-auto transform transition-transform duration-300 md:hidden z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div
          className='cursor-pointer hover:bg-slate-200 p-2 rounded'
          onClick={() => setSidebarOpen(false)}
        >
          <SidebarToggle />
        </div>
      </div>
    </>
  );
}

function MainContent({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className='w-full overflow-auto relative'>
      {/* Mobile Toggle Button */}
      {!sidebarOpen && (
        <div
          className='absolute top-4 left-4 cursor-pointer hover:bg-slate-200 p-2 rounded z-40 bg-white shadow md:hidden'
          onClick={() => setSidebarOpen(true)}
        >
          <SidebarToggle />
        </div>
      )}

      {/* Desktop Toggle Button (When Sidebar is Closed) */}
      {!sidebarOpen && (
        <div
          className='absolute top-4 left-4 cursor-pointer hover:bg-slate-200 p-2 rounded z-40 bg-white shadow hidden md:block'
          onClick={() => setSidebarOpen(true)}
        >
          <SidebarToggle />
        </div>
      )}

      <div className='h-42 bg-black hidden md:block'></div>
      <div className='grid grid-cols-1 md:grid-cols-11 gap-8 p-6'>
        <div className='h-72 rounded-2xl shadow-lg bg-red-200 md:col-span-2 md:-translate-y-24'></div>
        <div className='h-72 rounded-2xl shadow-lg bg-green-200 md:col-span-6'></div>
        <div className='h-72 rounded-2xl shadow-lg bg-yellow-200 md:col-span-3 hidden md:block'></div>
      </div>
    </div>
  );
}

export default App;
