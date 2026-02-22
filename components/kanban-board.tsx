"use client"

import { Board, Column, JobApplication } from "@/lib/models/models.types";
import { Award, Calendar, CheckCircle2, Mic, MoreHorizontal, MoreVertical, Trash2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicationDialog from "./create-job-dialog";



interface KanbanBoardProps {
    board: Board | null;
    userId: string;
}
interface ColConfig {
    color: string;
    icon: React.ReactNode;
}

const COLUMN_CONFIG: Array<ColConfig> = [
    {
        color: "bg-cyan-500",
        icon: <Calendar className="h-4 w-4" />,
    },
    {
        color: "bg-purple-500",
        icon: <CheckCircle2 className="h-4 w-4" />,
    },
    {
        color: "bg-green-500",
        icon: <Mic className="h-4 w-4" />,
    },
    {
        color: "bg-yellow-500",
        icon: <Award className="h-4 w-4" />,
    },
    {
        color: "bg-red-500",
        icon: <XCircle className="h-4 w-4" />,
    },
];

function DroppableColumn({ column, config, boardId, sortedColumns }: { column: Column; config: ColConfig; boardId: string; sortedColumns: Column[] }) {

    const jobApps = column.jobApplications ?? [];
    const sortedJobs = [...jobApps]
        .filter((j): j is JobApplication => j != null && typeof j === "object" && "order" in j)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return (
        <Card className=" min-w-[300px] shrink-0 shadow-md p-0">
            <CardHeader className={`${config.color} text-white rounded-t-lg pb-3`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {config.icon}
                        <CardTitle className="text-white text-base font-semibold">
                            {column.name}
                        </CardTitle>
                    </div>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-6 w-6 text-white hover:bg-white/20">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Column
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="space-y-2 pt-4 bg-gray-50/50 min-h-[400px] rounded-b-lg">
                {sortedJobs.map((job, key) => (
                    <SortableJobCard key={key} job={{ ...job, columnId: job.columnId || column._id }} columns={sortedColumns} />
                ))}


                <CreateJobApplicationDialog columnId={column._id} boardId={boardId}></CreateJobApplicationDialog>
            </CardContent>
        </Card>
    )
}

function SortableJobCard({ job, columns }: { job: JobApplication, columns: Column[] }) {
    return (
        <div>
            <JobApplicationCard />
        </div>
    )
}

export const KanbanBoard = ({ board, userId }: KanbanBoardProps) => {
    if (!board) {
        return (
            <div className="min-h-[400px] flex items-center justify-center text-gray-500">
                No board found. Create a board to get started.
            </div>
        );
    }

    const columns = board.columns ?? [];
    const sortedColumns = [...columns]
        .filter((c): c is Column => c != null && typeof c === "object" && "order" in c)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return (
        <div>
            <div>
                <div>
                    {sortedColumns.map((col, key) => {
                        const config = COLUMN_CONFIG[key] || {
                            color: "bg-gray-500",
                            icon: <Calendar className="h-4 w-4" />
                        }
                        return (
                            <DroppableColumn
                                key={key}
                                column={col}
                                config={config}
                                boardId={board._id}
                                sortedColumns={sortedColumns}
                            />)
                    })}
                </div>
            </div>
        </div>
    )
}
