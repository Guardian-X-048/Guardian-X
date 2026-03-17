import { useState } from 'react';
import { Shield, Bell, Search, User, Menu, X, Settings, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const notifications = [
    { id: 1, title: 'Critical Alert', message: 'Potential breach detected in EU region', time: '2m ago', type: 'critical' },
    { id: 2, title: 'AI Model Updated', message: 'Phishing detector v2.1 deployed', time: '15m ago', type: 'info' },
    { id: 3, title: 'Scan Complete', message: 'Daily vulnerability scan finished', time: '1h ago', type: 'success' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[#111827] border-b border-gray-800 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">GuardianX</h1>
            <span className="text-xs text-cyan-400">2.0 Powered</span>
          </div>
        </div>

        {/* Search */}
        <div className={`flex-1 max-w-xl mx-8 transition-all duration-300 ${searchFocused ? 'max-w-2xl' : ''}`}>
          <div className={`relative flex items-center bg-[#1f2937] rounded-xl border transition-all duration-200 ${
            searchFocused ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10' : 'border-gray-700'
          }`}>
            <Search className="w-5 h-5 text-gray-400 ml-4" />
            <input
              type="text"
              placeholder="Search breaches, threats, IOC..."
              className="w-full bg-transparent text-gray-200 placeholder-gray-500 px-4 py-3 outline-none"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="flex items-center gap-2 mr-4">
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
                <span className="text-[10px]">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 bg-[#1f2937] rounded-xl hover:bg-gray-700 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#1f2937] rounded-xl border border-gray-700 shadow-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-700">
                  <h3 className="font-semibold text-white">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      className="px-4 py-3 hover:bg-gray-800/50 border-b border-gray-800 last:border-0 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 mt-2 rounded-full ${
                          notif.type === 'critical' ? 'bg-red-500' :
                          notif.type === 'info' ? 'bg-blue-500' : 'bg-emerald-500'
                        }`} />
                        <div>
                          <div className="font-medium text-gray-200 text-sm">{notif.title}</div>
                          <div className="text-gray-400 text-xs mt-0.5">{notif.message}</div>
                          <div className="text-gray-500 text-xs mt-1">{notif.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 bg-gray-800/30 text-center">
                  <button className="text-cyan-400 text-sm hover:text-cyan-300">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 bg-[#1f2937] rounded-xl hover:bg-gray-700 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-200">Security Analyst</div>
                <div className="text-xs text-gray-400">Tier 3 Access</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1f2937] rounded-xl border border-gray-700 shadow-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-700">
                  <div className="text-sm font-medium text-gray-200">analyst@guardianx.io</div>
                  <div className="text-xs text-gray-400">Last login: 2 hours ago</div>
                </div>
                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800/50 text-gray-300">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800/50 text-gray-300">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
