import { Search } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between p-6 bg-gray-900/50 backdrop-blur-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="text-white tracking-wider">FLICNETIC</span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="#" className="text-white hover:text-orange-500 transition-colors">Home</a>
        </nav>
      </div>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 text-white placeholder-gray-400 px-4 py-2 pr-10 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
    </header>
  );
}