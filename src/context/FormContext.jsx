import { createContext, useReducer } from "react";
import { FormReducer } from "../reducers/FormReducer";
import { generateRandomNumber } from "@/lib/utils";
import { formsData } from "@/data";

const FORM_INITIAL_STATE = {
  forms: [...formsData],
  activeForm: {
    name: `New Form ${generateRandomNumber()}`,
    id: crypto.randomUUID(),
    FormElements: [],
  },
};

export const FromContext = createContext({
  formState: FORM_INITIAL_STATE,
  dispatchForms: () => {},
});

const FormProvider = ({ children }) => {
  const [formState, dispatchForms] = useReducer(
    FormReducer,
    FORM_INITIAL_STATE
  );

  return (
    <FromContext.Provider value={{ formState, dispatchForms }}>
      {children}
    </FromContext.Provider>
  );
};

export default FormProvider;
