"use client"
import { useState } from "react"
import { Board, Column } from "../models/models.types"


export const useBoards = (initialBoards?: Board | null) => {
  const [board, setBoard] = useState<Board | null>(initialBoards || null);
  const [columns, setColumns] = useState<Column[]>(initialBoards?.columns || []);
  const [error, setError] = useState<string | null>(null);

  async function moveJob(jobApplicationId: string, newColumnId: string,newOrder:number){

  }

  return {
    board,
    columns,
    error,
    moveJob
  }
}
