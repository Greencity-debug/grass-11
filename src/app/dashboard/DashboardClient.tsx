// src/app/dashboard/DashboardClient.tsx
'use client';

import { useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import SignOutButton from './SignOutButton';
import Map from '@/components/Map';
import { Square, Minus, MapPin, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import eventBus from '@/lib/eventBus';

type Mode = 'none' | 'draw_polygon' | 'draw_line' | 'draw_point' | 'edit' | 'delete';

export default function DashboardClient({ session }: { session: Session }) {
  const [mode, setMode] = useState<Mode>('none');

  const handleModeChange = (newMode: Mode) => {
    const nextMode = mode === newMode ? 'none' : newMode;
    setMode(nextMode);
    eventBus.emit('mode-change', nextMode);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ================= ВОССТАНОВЛЕННЫЙ САЙДБАР ================= */}
      <aside className="w-72 border-r border-gray-200 bg-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-primary">
          Grasscutter
        </h2>
        
        <nav className="flex-1">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-500 px-2">Инструменты</p>
            
            {/* Верхний ряд кнопок */}
            <div className="flex justify-around">
              <Button 
                variant="ghost" 
                className="flex flex-col h-auto p-2"
                onClick={() => handleModeChange('draw_point')}
              >
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-xs text-slate-600 mt-1">Дерево</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex flex-col h-auto p-2"
                onClick={() => handleModeChange('draw_line')}
              >
                <Minus className="h-6 w-6 text-primary" />
                <span className="text-xs text-slate-600 mt-1">Кустарник</span>
              </Button>
              <Button 
                variant={mode === 'draw_polygon' ? 'secondary' : 'ghost'} 
                className="flex flex-col h-auto p-2"
                onClick={() => handleModeChange('draw_polygon')}
              >
                <Square className="h-6 w-6 text-primary" />
                <span className="text-xs text-slate-600 mt-1">Газон</span>
              </Button>
            </div>

            <hr />

            {/* Нижний ряд кнопок */}
            <div className="flex justify-around">
              <Button 
                variant="ghost" 
                className="flex flex-col h-auto p-2 text-destructive hover:text-destructive"
                onClick={() => handleModeChange('delete')}
              >
                <Trash2 className="h-6 w-6" />
                <span className="text-xs mt-1">Удалить</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex flex-col h-auto p-2"
                onClick={() => handleModeChange('edit')}
              >
                <Pencil className="h-6 w-6 text-primary" />
                <span className="text-xs text-slate-600 mt-1">Редактировать</span>
              </Button>
            </div>
          </div>
        </nav>

        <div>
          <div className="mb-4 p-2 rounded-lg bg-gray-100">
            <p className="text-xs text-gray-600">Вы вошли как:</p>
            <p className="text-sm font-medium text-gray-800 break-words">{session.user.email}</p>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* ================= ВОССТАНОВЛЕННАЯ КАРТА ================= */}
      <main className="flex-1">
        <Map />
      </main>
    </div>
  );
}