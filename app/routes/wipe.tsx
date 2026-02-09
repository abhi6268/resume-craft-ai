import { useEffect } from "react";
import { useNavigate } from "react-router";
import { storage } from "~/lib/storage";

export default function WipeApp() {
    const navigate = useNavigate();

    useEffect(() => {
        storage.wipe();
        navigate("/", { replace: true });
    }, [navigate]);

    return null;
}