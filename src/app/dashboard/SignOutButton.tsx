// src/app/dashboard/SignOutButton.tsx
'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function SignOutButton() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    // ИЗМЕНЕНО: Меняем вариант на 'outline' и добавляем классы для красного цвета
    <Button 
      variant="outline" 
      onClick={handleSignOut} 
      className="w-full border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
    >
      Выйти
    </Button>
  )
}