import type { Note } from "@/types";
import { formatDate } from "@/utils/utils";

type NoteDetailProps = {
  note: Note
}

function NoteDetail({note}: NoteDetailProps) {
  return (
   <div className="p-3 flex justify-between items-center">
    <div>
      <p><span className="font-bold">{note.createdBy.name}:</span> {note.content}</p>
      <p className="text-gray-500">{formatDate(note.createdAt)}</p>
    </div>
   </div>
  )
}

export default NoteDetail