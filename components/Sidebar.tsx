'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  BeakerIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Analyzer', href: '/analyzer', icon: BeakerIcon },
  { name: 'Review', href: '/review', icon: BellIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 w-72 h-screen bg-[#0f172a] text-white flex flex-col z-50 shadow-2xl">
      {/* Logo Area */}
      <div className="h-24 flex items-center px-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] p-2 rounded-xl shadow-lg shadow-indigo-500/30">
            <svg width="24" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M20.6769 0H1.58471C0.999915 0 0.707047 0.707047 1.12056 1.12056L6.37184 6.37184C6.49495 6.49495 6.66191 6.5641 6.836 6.5641H14.1128C14.4753 6.5641 14.7692 6.85799 14.7692 7.22051V14.4973C14.7692 14.6714 14.8384 14.8384 14.9615 14.9615L20.2128 20.2128C20.6263 20.6263 21.3333 20.3334 21.3333 19.7486V0.65641C21.3333 0.293885 21.0394 0 20.6769 0Z" fill="currentColor"/>
              <path d="M11.4872 15.5897C11.4872 18.7618 8.91569 21.3333 5.74359 21.3333C2.57149 21.3333 0 18.7618 0 15.5897C0 12.4176 2.57149 9.84615 5.74359 9.84615C8.91569 9.84615 11.4872 12.4176 11.4872 15.5897Z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight block">Attri</span>
            <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Lab Analyzer</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Menu
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[var(--primary)] text-white shadow-lg shadow-indigo-900/50'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`h-5 w-5 flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
              {item.name}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile / Footer */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-sm font-bold shadow-md ring-2 ring-white/10 group-hover:ring-white/20 transition-all">
            RH
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Renal Clinic</p>
            <p className="text-xs text-gray-400 truncate">Houston, TX</p>
          </div>
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
        </div>
      </div>
    </aside>
  );
}
