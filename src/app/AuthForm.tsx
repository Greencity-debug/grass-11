// src/app/AuthForm.tsx
'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    alert('Проверьте почту для подтверждения!')
  }

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else location.reload()
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        {/* ИЗМЕНЕНО: Добавлен класс text-primary */}
        <CardTitle className="text-2xl text-primary">Вход</CardTitle>
        <CardDescription>Введите ваш email и пароль.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Пароль</Label>
          <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={handleSignIn} className="w-full">Войти</Button>
          <Button onClick={handleSignUp} variant="outline" className="w-full">Регистрация</Button>
        </div>
      </CardContent>
    </Card>
  );
}