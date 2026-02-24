import { Column, JobApplication } from "@/lib/models/models.types";

interface JobApplicationCardProps{
    job:JobApplication;
    columns:Column[];
}

const JobApplicationCard = ({job, columns}:JobApplicationCardProps) => {
    return (
        <div>job-application-card</div>
    )
}

export default JobApplicationCard;