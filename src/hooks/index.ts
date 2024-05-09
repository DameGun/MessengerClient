import { AppDispatch, RootState } from "@state/store";
import { useDispatch, useSelector } from "react-redux";

// Redux hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()