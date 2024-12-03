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
import { TrainerForm } from "../FormAddTrainer";


export function ButtonAddTrainer() {
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog} >
            <DialogTrigger asChild>
                <Button variant="outline" onClick={()=> setOpenDialog(true)}>
                    Agregar nuevo Entrenador
                    <PlusCircle className="ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent>
            <DialogTitle>Agregar un Entrenador</DialogTitle> 
                <DialogHeader>
                    <DialogDescription>
                        <TrainerForm 
                            editingId={editingId}
                            setEditingId={setEditingId}
                            setOpenDialog={setOpenDialog}/>
                    </DialogDescription>    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
