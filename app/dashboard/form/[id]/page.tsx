'use client'

import { useParams } from 'next/navigation'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StatCard from '@/components/dashboard/StatCard'
import { Button } from '@/components/ui/button'
import FormResponses from '@/components/dashboard/FormResponses'
import { Copy, Download, ExternalLink, Loader2, RotateCcw, Settings, Sparkles } from 'lucide-react'
import FormSettings from '@/components/dashboard/FormSettings'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

const SingleFormPage = () => {
  const { id } = useParams()
  const { user, loading } = useAuth()
  const [reloadData, setReloadData] = useState(null)
  const [formLoading, setFormLoading] = useState(null)
  const [refreshingData, setRefreshingData] = useState(false)

  const [responseData, setResponseData] = useState<any>(null)
  const [showFormSettings, setShowFormSettings] = useState(false)


  useEffect(() => {
    setFormLoading(true)

    const getResponses = async () => {
      try {
        const res = await axios.post('/api/forms/getResponses', {
          formId: id,
          owner: user?._id,
        })
        setResponseData(res.data)
      } catch (err) {
        console.error('Error fetching responses:', err)
      }
    }
    if (reloadData) {
      setReloadData(null)
    }
    if (id && user) {
      getResponses()
      setFormLoading(false)
    }

  }, [id, user, reloadData, showFormSettings])

  const goToForm = () => {
    window.open(`/${id}`, '_ blank')
  }

  const link = `https://formix-seven.vercel.app/${responseData?._id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied!');
  };

  const handleRefresh = () => {
    setReloadData(true)
    setRefreshingData(true)
    setTimeout(() => {
      setReloadData(false)
    }, 1000)

    toast.success('Data refreshed!')
    setRefreshingData(false)
  }

  const exportToExcel = () => {
    if (!responseData?.responses || responseData.responses.length === 0) {
      toast.error('No data to export!')
      return
    }

    // Transform responses to match headers
    const formattedResponses = responseData.responses.map((item: any, index: number) => {
      const formattedResponse: any = { 'S.No': index + 1 }
      item.response.forEach((resp: any) => {
        const header = responseData.headers.find((h: any) => h.id === resp.id)
        if (header) {
          formattedResponse[header.header] = resp.response
        }
      })
      return formattedResponse
    })

    const worksheet = XLSX.utils.json_to_sheet(formattedResponses)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Responses')
    XLSX.writeFile(workbook, `${responseData.title}_responses.xlsx`)
    toast.success('Exported to Excel successfully!')
  }

  const exportToPDF = () => {
    if (!responseData?.responses || responseData.responses.length === 0) {
      toast.error('No data to export!')
      return
    }

    const doc = new jsPDF()
    
    // Transform responses to match headers
    const tableData = responseData.responses.map((item: any, index: number) => {
      const formattedResponse: any = {}
      item.response.forEach((resp: any) => {
        const header = responseData.headers.find((h: any) => h.id === resp.id)
        if (header) {
          formattedResponse[header.header] = resp.response
        }
      })
      return [index + 1, ...responseData.headers.map((header: any) => formattedResponse[header.header] || '')]
    })

    autoTable(doc, {
      head: [['S.No', ...responseData.headers.map((h: any) => h.header)]],
      body: tableData,
      startY: 25,
    })

    doc.save(`${responseData.title}_responses.pdf`)
    toast.success('Exported to PDF successfully!')
  }

  console.log('responseData', responseData)

  return (
    <div className='p-5 bg-[#1D1E21] h-screen'>
      {
        responseData && (
          <div className='flex flex-col gap-5'>
            <div className='flex justify-between'>
              <div>
                <div className='flex items-center gap-5'>
                  <div className='text-2xl font-semibold text-white'>{responseData.title}</div>
                  <div>
                    {
                      responseData.isActive ? (
                        <Badge variant="outline" className="ml-2 text-green-500 border-green-500">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="ml-2 text-red-500 border-red-500">
                          Inactive
                        </Badge>
                      )
                    }
                  </div>
                </div>
                <div className='text-sm text-slate-400'>{responseData.description}</div>


              </div>
              <div className='cursor-pointer flex items-center gap-2'>
                <Button onClick={goToForm} className='bg-[#050811] text-white text-sm p-1 flex hover:bg-[#1D1E21]/70 border-[1px] border-white/30 shadow-sm'>
                  Go to Form <ExternalLink size={14} />
                </Button>
                <Settings className='text-white' onClick={() => setShowFormSettings(true)} />
              </div>
            </div>

            <div className='flex gap-2 flex-col'>
              <div className='flex justify-between items-center w-full'>
                <div className=' text-sm font-medium text-white'>Responses</div>
                <div className='flex gap-2'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className='text-xs flex items-center gap-1 text-white border-[1px] border-white/30 py-1 rounded-sm cursor-pointer px-2 shadow-sm'>
                        <Download strokeWidth={1} size={16} />
                        <span>Export Data</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#171717] border border-[#2E2E2F]">
                      <DropdownMenuItem 
                        className="text-white hover:bg-[#2E2E2F] cursor-pointer text-sm"
                        onClick={exportToExcel}
                      >
                        Export as Excel
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-white hover:bg-[#2E2E2F] cursor-pointer text-sm"
                        onClick={exportToPDF}
                      >
                        Export as PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <button onClick={handleRefresh} className={`text-xs flex items-center gap-1 text-white border-[1px] border-white/30 py-1 rounded-sm cursor-pointer px-2 shadow-sm ${refreshingData ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {refreshingData ? <Loader2 className='animate-spin' size={16} /> : <RotateCcw strokeWidth={1} size={16} />}
                    <span>Refresh Data</span>
                  </button>
                </div>
              </div>
              <div className='bg-[#171717] p-4 rounded-xl border border-[#2E2E2F]'>
                {responseData && responseData.responses && responseData.responses.length > 0 ? (
                  <FormResponses
                    responses={responseData.responses}
                    headers={responseData.headers}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-4">
                    <Image src="/EmptyState.svg" width={100} height={100} alt="No Responses" />

                    <span className="text-[#8E8E90] text-sm font-medium">
                      No responses yet. Share your form to start collecting responses!
                    </span>

                    <div className="w-full max-w-md bg-[#2b2b2b] rounded-xl px-4 py-3 flex items-center justify-between gap-2 shadow-md border border-[#3a3a3a]">
                      <span className="text-sm text-white truncate">{link}</span>
                      <button onClick={copyToClipboard} className="hover:scale-105 transition cursor-pointer">
                        <Copy className="h-5 w-5 text-gray-300 hover:text-white" />
                      </button>
                    </div>
                  </div>

                )

                }
              </div>
            </div>
          </div>
        )
      }

      {
        showFormSettings && (
          <FormSettings setShowFormSettings={setShowFormSettings} form={responseData} formId={id} />
        )
      }

    </div>
  )
}

export default SingleFormPage
