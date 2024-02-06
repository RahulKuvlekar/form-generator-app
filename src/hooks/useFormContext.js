import { useContext } from "react";
import { FromContext } from "../context/FormContext";

export const useFormContext = () => useContext(FromContext);
