'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatDateAndTime } from "@/utils/HelperFunctions"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"

const FormCard = ({ form, handleFormDelete }) => {
    const [open, setOpen] = useState(false)

    console.log('FormCard', form)

    return (
        <Link href={'/dashboard/form/' + form._id} className="w-full">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="w-full bg-[#1E1E1E] text-white border-[#333] hover:shadow-lg hover:border-[#444] transition-all duration-300">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                {form.title}
                                {!form.isActive ? (
                                    <Badge variant="outline" className="ml-2 text-red-500 border-red-500">
                                        Inactive
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="ml-2 text-green-500 border-green-500">
                                        Active
                                    </Badge>
                                )}
                            </CardTitle>
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    {/* <Button size="icon" variant="ghost" className="hover:bg-red-500/10 text-red-500 hover:text-white">
                                    <Trash2 size={18} />
                                </Button> */}
                                </DialogTrigger>
                                <DialogContent className="bg-[#1D1E21] border border-[#333] text-white">
                                    <DialogHeader>
                                        <DialogTitle>Are you sure?</DialogTitle>
                                    </DialogHeader>
                                    <p className="text-sm text-muted-foreground">
                                        This will permanently delete the form and all its responses.
                                    </p>
                                    <DialogFooter>
                                        <button className="text-[#D1D5DB] bg-[#1A1C22] hover:bg-[#2A2D34] border border-[#4B4B4B] flex items-center justify-center md:justify-start gap-0 md:gap-2 text-sm px-2 md:px-3 py-2 rounded-md cursor-pointer transition-colors duration-200"
                                            onClick={() => setOpen(false)}>
                                            Cancel
                                        </button>
                                        <Button variant="destructive" onClick={() => handleFormDelete(form?._id)}>
                                            Delete
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <CardDescription className="text-[#A3A3A3]">{form.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Separator className="bg-[#333]" />
                        <div className="flex items-center justify-between text-sm text-[#B0B0B0]">
                            <span><strong>Responses:</strong> {form.responses.length}</span>
                            <span>{formatDateAndTime(form.createdAt, true)}</span>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    )
}

export default FormCard
