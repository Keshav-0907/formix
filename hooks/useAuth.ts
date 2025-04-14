'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface User {
    name: string
    email: string
    password: string
    _id: string
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post('/api/auth/loginUser', { email, password })
            if (res.status === 200) {
                localStorage.setItem('authToken', res.data.token)
                setUser(res.data.user)
                return ({
                    status: res.status,
                    message: 'Login successful',
                })
            }
            throw new Error('Login failed')
        } catch (error: any) {
            console.error('Login failed:', error.response?.data || error.message)
            return ({
                status: error.response?.status || 500,
                message: error.response?.data?.message || 'Login failed',
            })
        }
    }

    const getUser = async () => {
        try {
            const token = localStorage.getItem('authToken')
            if (!token) return null

            const res = await axios.get('/api/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            setUser(res.data.user)
            return res.data.user
        } catch (error) {
            console.error('Get user failed:', error)
            setUser(null)
            return null
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        setUser(null)
    }

    useEffect(() => {
        const init = async () => {
            await getUser()
            setLoading(false)
        }
        init()
    }, [])

    return {
        login,
        getUser,
        logout,
        user,
        isAuthenticated: !!user,
        loading,
    }
}
