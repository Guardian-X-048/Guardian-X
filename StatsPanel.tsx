import { LayoutDashboard, Shield, AlertTriangle, BarChart3, Settings, HelpCircle, Database, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
  { id: 'alerts', icon: AlertTriangle, label: 'Breach Alerts', badge: 12 },
  { id: 'intelx', icon: Database, label: 'IntelX Feed', badge: 'LIVE' },
  { id: 'ai-analysis', icon: Cpu, label: 'AI Analysis', badge: null },
  { id: 'analytics', icon: BarChart3, label: 'Analytics', badge: null },
];

const bottomItems = [
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'help', icon: HelpCircle, label: 'Help & Docs' },
];

export default function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 bg-[#111827] border-r border-gray-800 transition-all duration-300 z-40 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Main Menu */}
        <div className="flex-1 py-4">
          <div className="px-4 mb-2">
            {!collapsed && (
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Main Menu
              </span>
            )}
          </div>
          <nav className="space-y-1 px-3">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30'
                      : 'hover:bg-gray-800/50 border border-transparent'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-gray-200'
                    }`}
                  />
                  {!collapsed && (
                    <>
                      <span
                        className={`flex-1 text-left text-sm ${
                          isActive ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-200'
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            item.badge === 'LIVE'
                              ? 'bg-emerald-500/20 text-emerald-400 animate-pulse'
                              : 'bg-cyan-500/20 text-cyan-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="py-4 border-t border-gray-800">
          <div className="px-3 space-y-1">
            {bottomItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-800/50 transition-colors group"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-gray-200" />
                  {!collapsed && (
                    <span className="text-sm text-gray-400 group-hover:text-gray-200">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Collapse Toggle */}
          <div className="px-3 mt-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Collapse</span>
                </>
              )}
            </button>
          </div>

          {/* Status */}
          {!collapsed && (
            <div className="px-4 mt-4">
              <div className="bg-[#0a0e17] rounded-xl p-4 border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs text-emerald-400 font-medium">System Online</span>
                </div>
                <div className="text-xs text-gray-500">
                  IntelX: Connected<br />
                  NVIDIA: Ready<br />
                  Last sync: 30s ago
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
