"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { DisciplineForm } from "../FormAddScheduleDiscipline";
import { useRouter } from "next/router";

export function ButtonAddScheduleDiscipline() {
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const router = useRouter();
    const { rowId } = router.query; 

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={()=> setOpenDialog(true)}>
                    Agregar nuevo horario { rowId }
                    <PlusCircle className="ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent>
            <DialogTitle>Agregar un nuevo horario</DialogTitle> {/* Título accesible */}
                <DialogHeader>
                    <DialogDescription>
                        <DisciplineForm 
                            editingId={editingId}
                            setEditingId={setEditingId}
                            setOpenDialog={setOpenDialog}/>
                    </DialogDescription>    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
