import { useAppSelector } from ".";
import { selectCurrentToken } from "@services/redux/auth/authSlice";
import { useEffect } from "react";
import { getSignalRConnection } from "@services/signalr";

export const useSignalRConnection = () => {
    const token = useAppSelector(selectCurrentToken) || '';

    useEffect(() => {
        getSignalRConnection(token)
    }, [])
}