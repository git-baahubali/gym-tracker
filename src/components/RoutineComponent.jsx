// This Component is responseible to display options when right clicking a routine or long touch a routine
// also rensponsible for providing optiosn to edit exercises routine list
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useState } from "react"
import SearchExercise from "./SearchExercise"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



export default function RoutineComponent(props) {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  console.log('Search');
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const renderEditDialog = () => (
    <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen} 
    className='top-0'>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit  <span className="underline underline-offset-2">{props.name}</span>  Routine</DialogTitle>
        </DialogHeader>
        <div>
          {/* Render your exercise list and editing options here */}
          <SearchExercise routineId={props.id}/>
        </div>
        <DialogFooter>
          <Button onClick={() => setEditDialogOpen(false)}>Close</Button>
          {/* <Button type="submit"></Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const renderDeleteDialog = () => (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen} >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter >
          <div className='flex justify-between'>
          <Button type="submit" onClick={props.handleDelete} variant="destructive">Confirm</Button>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div >
      <ContextMenu >
        <ContextMenuTrigger onClick={props.handleRoutineClick}>{props.children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={handleEditClick}>
           <EditIcon fontSize="small" className="mx-4"/> Edit</ContextMenuItem>
          <ContextMenuItem onSelect={handleDeleteClick}>
          <DeleteIcon fontSize="small" className="mx-4"/>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {renderEditDialog()}
      {renderDeleteDialog()}
    </div>
  );
}