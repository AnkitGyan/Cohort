import { useState } from "react";

export function SidebarClass1() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen transition-all duration-500">
      {/* Sidebar */}
      <div
        className={`bg-red-200 h-full transition-all duration-500 overflow-hidden ${
          isOpen ? "w-64" : "w-0"
        }`}
      >
        <div className="p-4 whitespace-nowrap">Sidebar</div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-green-800 text-white p-6 transition-all duration-500">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-4 p-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition"
        >
          {isOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>
        <div>Main content goes here.</div>
      </div>
    </div>
  );
}
