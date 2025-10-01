// src/app/dashboard/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient'; // Импортируем наш новый клиентский компонент

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    redirect('/');
  }
  
  // Отрисовываем клиентский компонент и передаем ему сессию
  return <DashboardClient session={data.session} />;
}