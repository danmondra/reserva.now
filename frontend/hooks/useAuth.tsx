'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export type UserType = 'client' | 'provider' | null

export function useAuth(requiredType?: UserType) {
  const router = useRouter()
  const [userType, setUserType] = useState<UserType>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const storedUserType = localStorage.getItem('userType') as UserType

    if (!isLoggedIn) {
      router.push('/login')
      return
    }

    setUserType(storedUserType)

    // If a specific user type is required and doesn't match, redirect
    if (requiredType && storedUserType !== requiredType) {
      if (storedUserType === 'provider') {
        router.push('/profesional-dashboard')
      } else {
        router.push('/')
      }
      return
    }

    setIsLoading(false)
  }, [router, requiredType])

  return { userType, isLoading }
}