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
import { DisciplineForm } from "../FormAddDiscipline";


export function ButtonAddDiscipline() {
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={()=> setOpenDialog(true)}>
                    Agregar nueva Disciplina
                    <PlusCircle className="ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent>
            <DialogTitle>Agregar una Disciplina</DialogTitle> {/* Título accesible */}
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
