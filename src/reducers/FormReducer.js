import { generateRandomNumber } from "@/lib/utils";
import {
  ADD_CHECKBOX_TO_FORM,
  ADD_DROPDOWN_TO_FORM,
  ADD_FORMS,
  ADD_INPUT_TO_FORM,
  ADD_RADIO_TO_FORM,
  CREATE_NEW_FORM,
  RESET_FORM,
  SAVE_FORM,
  UPDATE_FORM,
  UPDATE_FORM_TITLE,
} from "../constants/index";

export const FormReducer = (prevState, action) => {
  switch (action.type) {
    case CREATE_NEW_FORM:
      return {
        ...prevState,
        activeForm: {
          name: `New Form ${generateRandomNumber()}`,
          id: crypto.randomUUID(),
          FormElements: [],
        },
      };

    case UPDATE_FORM_TITLE:
      return {
        ...prevState,
        activeForm: {
          ...prevState.activeForm,
          name: action.payload,
        },
      };
    case ADD_FORMS:
      return {
        ...prevState,
        forms: [...prevState.forms, ...action.payload],
      };

    case ADD_INPUT_TO_FORM: {
      const updatedState = structuredClone(prevState);
      updatedState.activeForm.FormElements.push(action.payload);
      return updatedState;
    }
    case ADD_DROPDOWN_TO_FORM: {
      const updatedState = structuredClone(prevState);
      updatedState.activeForm.FormElements.push(action.payload);
      return updatedState;
    }
    case ADD_CHECKBOX_TO_FORM: {
      const updatedState = structuredClone(prevState);
      updatedState.activeForm.FormElements.push(action.payload);
      return updatedState;
    }
    case ADD_RADIO_TO_FORM: {
      const updatedState = structuredClone(prevState);
      updatedState.activeForm.FormElements.push(action.payload);
      return updatedState;
    }

    case SAVE_FORM: {
      const updatedState = structuredClone(prevState);
      updatedState.forms.push(action.payload);
      return updatedState;
    }

    case UPDATE_FORM: {
      return {
        ...prevState,
        forms: prevState.forms.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    }

    case RESET_FORM:
      return {
        ...prevState,
        activeForm: {
          name: `New Form ${generateRandomNumber()}`,
          id: crypto.randomUUID(),
          FormElements: [],
        },
      };

    default:
      return prevState;
  }
};
