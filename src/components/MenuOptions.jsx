import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { DialogComp } from "./DialogComp"

function MenuOptions({children}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        
        
        <DialogComp asChild>
        <ContextMenuItem><span>Edit</span></ContextMenuItem>
        </DialogComp>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>

  )
}

export default MenuOptions