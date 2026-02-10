import { Briefcase } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { getSession } from "@/lib/auth/auth"


export const Navbar = async () => {

    const session = await getSession();

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex justify-between h-16 items-center px-4">
                <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
                    <Briefcase />
                    Job Tracker
                </Link>
                <div className="flex items-center gap-4">
                    {session?.user ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost" className="text-gray-700 hover:text-black">Dashboard</Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in" >
                                <Button variant='ghost' className="text-gray-700 hover:text-black">Log in</Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button className="bg-primary hover:bg-primary/90">Start for free</Button>
                            </Link>
                        </>)}

                </div>
            </div>
        </nav>
    )
}
