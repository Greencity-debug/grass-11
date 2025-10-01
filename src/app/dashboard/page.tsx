// src/app/dashboard/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Map from '@/components/Map'; // Импортируем наш новый компонент карты

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    redirect('/');
  }
  
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-72 border-r border-gray-200 bg-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8" style={{color: '#172E00'}}>
          Grasscutter
        </h2>
        
        <nav className="flex-1">
          {/* Здесь будет меню и инструменты */}
          <p className="text-sm text-gray-500">Навигация...</p>
        </nav>

        <div>
          <div className="mb-4 p-2 rounded-lg bg-gray-100">
            <p className="text-xs text-gray-600">Вы вошли как:</p>
            <p className="text-sm font-medium text-gray-800 break-words">
              {data.session.user.email}
            </p>
          </div>
          {/* Кнопка выхода */}
          <form action="/auth/signout" method="post">
            <button type="submit" className="w-full text-left p-2 rounded text-sm text-red-600 hover:bg-red-50">
              Выйти
            </button>
          </form>
        </div>
      </aside>

      {/* Основная область с картой */}
      <main className="flex-1">
        <Map />
      </main>
    </div>
  );
}