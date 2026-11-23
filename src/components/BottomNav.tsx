import React from 'react';
import { Calendar, Compass, Home, User } from 'lucide-react';
import { TabKey } from '../types/campo';

interface BottomNavProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

const NAV_ITEMS: {
  id: TabKey;
  label: string;
  icon: React.FC<{ className?: string; strokeWidth?: number }>;
}[] = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'explorar', label: 'Explorar', icon: Compass },
  { id: 'eventos', label: 'Eventos', icon: Calendar },
  { id: 'perfil', label: 'Perfil', icon: User },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <nav
      aria-label="Navegación principal"
      className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#ECE6DC] px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-4 items-center">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 rounded-xl transition-colors cursor-pointer ${
                isActive
                  ? 'text-[#8C6239]'
                  : 'text-[#7A7167] hover:text-[#1F1A15]'
              }`}
            >
              <Icon
                className="w-[21px] h-[21px]"
                strokeWidth={isActive ? 2.3 : 1.8}
              />
              <span
                className={`text-[10.5px] leading-tight whitespace-nowrap ${
                  isActive ? 'font-bold' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
