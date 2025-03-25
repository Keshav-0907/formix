'use client'
import Header from "@/components/dashboard/Header"
import Sidebar from "@/components/dashboard/Sidebar"
import { usePathname } from 'next/navigation'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const isCreateFormPage = pathname === '/dashboard/form/create'

    return (
        <div className="flex">
            {!isCreateFormPage && <Sidebar />}
            <div className="flex-1">
                <Header />
                <DndProvider backend={HTML5Backend}>
                    {children}
                </DndProvider>
            </div>
        </div>
    )
}