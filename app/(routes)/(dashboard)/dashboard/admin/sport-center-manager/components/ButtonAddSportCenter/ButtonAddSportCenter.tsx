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
import { SportCenterForm } from "../FormAddSportCenter";


export function ButtonAddSportCenter() {
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={()=> setOpenDialog(true)}>
                    Agregar nuevo centro deportivo
                    <PlusCircle className="ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent>
            <DialogTitle>Agregar un nuevo centro deportivo</DialogTitle> {/* Título accesible */}
                <DialogHeader>
                    <DialogDescription>
                        <SportCenterForm 
                        editingId={editingId}
                        setEditingId={setEditingId}
                        setOpenDialog={setOpenDialog}/>
                    </DialogDescription>    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
