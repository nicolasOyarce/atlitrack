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
import { FormAddClass } from "../FormAddClass";


export function ButtonAddClass() {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <Dialog open={openDialog}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={()=> setOpenDialog(true)}>
                    Agregar nueva clase
                    <PlusCircle className="ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogDescription>
                        <FormAddClass />
                    </DialogDescription>    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
