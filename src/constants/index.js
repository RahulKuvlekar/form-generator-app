import {
  CheckboxModal,
  DropdownModal,
  InputModal,
  RadioModal,
} from "../components/GenerateFormPage/Modals";

export const CREATE_NEW_FORM = "CREATE_NEW_FORM";
export const UPDATE_FORM_TITLE = "UPDATE_FORM_TITLE";
export const ADD_INPUT_TO_FORM = "ADD_INPUT_TO_FORM";
export const EDIT_INPUT_TO_FORM = "EDIT_INPUT_TO_FORM";
export const ADD_DROPDOWN_TO_FORM = "ADD_DROPDOWN_TO_FORM";
export const EDIT_DROPDOWN_TO_FORM = "EDIT_DROPDOWN_TO_FORM";
export const ADD_RADIO_TO_FORM = "ADD_RADIO_TO_FORM";
export const EDIT_RADIO_TO_FORM = "EDIT_RADIO_TO_FORM";
export const ADD_CHECKBOX_TO_FORM = "ADD_CHECKBOX_TO_FORM";
export const EDIT_CHECKBOX_TO_FORM = "EDIT_CHECKBOX_TO_FORM";
export const ADD_FORMS = "ADD_FORMS";
export const SAVE_FORM = "SAVE_FORM";
export const RESET_FORM = "RESET_FORM";
export const UPDATE_FORM = "UPDATE_FORM";

export const formMenus = [
  {
    id: "formMenus-1",
    name: "Input",
    component: InputModal,
  },
  {
    id: "formMenus-2",
    name: "Dropdown",
    component: DropdownModal,
  },
  {
    id: "formMenus-4",
    name: "Checkbox",
    component: CheckboxModal,
  },
  {
    id: "formMenus-3",
    name: "Radio",
    component: RadioModal,
  },
  {
    id: "formMenus-5",
    name: "File Upload",
    component: () => {},
  },
];
