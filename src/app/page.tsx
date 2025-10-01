// src/app/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthForm from './AuthForm';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="mb-8 text-center">
        {/* ИЗМЕНЕНО: Добавлен класс text-primary */}
        <h1 className="text-4xl font-bold text-primary">Grasscutter 1.1</h1>
        <p className="text-slate-600">Система управления зелеными насаждениями</p>
      </div>
      <AuthForm />
    </main>
  );
}