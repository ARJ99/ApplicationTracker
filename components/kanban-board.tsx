"use client"

import { Board } from "@/lib/models/models.types";

interface KanbanBoardProps{
    board:Board;
    userId:string;
}

export const KanbanBoard = ({board,userId}:KanbanBoardProps) => {
    return (
        <div>kaban-board</div>
    )
}
