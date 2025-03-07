import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BackButton({ url, className }: { url?: string; className?: string }) {
    const navigate = useNavigate();

    return (
        <div onClick={() => (url ? navigate(url) : navigate(-1))} className={className}>
            <ArrowLeft size={24} />
        </div>
    );
}
