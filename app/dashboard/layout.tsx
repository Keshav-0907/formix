'use client'

import { useEffect } from "react"
import { useRouter, usePathname } from 'next/navigation'
import Header from "@/components/dashboard/Header"
import Sidebar from "@/components/dashboard/Sidebar"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useSession } from "next-auth/react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const isCreateFormPage = pathname === '/dashboard/form/create'
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const isUser = session?.user

  const shouldShowHeader = !pathname.includes('/dashboard/*')

  useEffect(() => {
    if (!loading && !isUser) {
      router.push('/auth')
    }
  }, [loading, isUser, router])

  if (loading || !isUser) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {!isCreateFormPage && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        {shouldShowHeader && <Header />}
        <DndProvider backend={HTML5Backend}>
          {/* Scrollable children only */}
          <div className="flex-1 overflow-y-auto bg-black">
            {children}
          </div>
        </DndProvider>
      </div>
    </div>
  )
}
