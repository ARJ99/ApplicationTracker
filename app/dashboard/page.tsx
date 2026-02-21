import { KanbanBoard } from "@/components/kanban-board";
import { getSession } from "@/lib/auth/auth"
import connectDB from "@/lib/db";
import { Board, Column } from "@/lib/models";
import { redirect } from "next/navigation";

const DEFAULT_COLUMN_NAMES = ["Applied", "Interviewing", "Offer", "Rejected", "Archived"];

const Dashboard = async () => {
    const session = await getSession();
    if (!session?.user){
        redirect("sign-in");
    }

    await connectDB();

    let board = await Board.findOne({
        userId: session.user.id,
        name: "Job Hunt",
    }).populate({
        path: "columns",
    });

    // Create default board with columns if none exists (e.g. first-time user)
    if (!board) {
        const newBoard = await Board.create({
            name: "Job Hunt",
            userId: session.user.id,
            columns: [],
        });
        const columnIds = await Promise.all(
            DEFAULT_COLUMN_NAMES.map((name, order) =>
                Column.create({
                    name,
                    boardId: newBoard._id,
                    order,
                    jobApplications: [],
                }).then((col) => col._id)
            )
        );
        await Board.findByIdAndUpdate(newBoard._id, { columns: columnIds });
        board = await Board.findOne({
            userId: session.user.id,
            name: "Job Hunt",
        }).populate({ path: "columns" });
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-black">Job Hunt</h1>
                    <p className="text-gray-600">Track your job application</p>
                </div>
                <KanbanBoard board={JSON.parse(JSON.stringify(board))} userId={session.user.id}/>
            </div>
        </div>
    )
}

export default Dashboard