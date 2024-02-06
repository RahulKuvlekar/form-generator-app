import { useFormContext } from "../../hooks/useFormContext";
import { Button } from "../ui/button";
import EditTitleDialog from "./EditTitleDialog";
import { useState } from "react";
import { Pencil } from "lucide-react";
import FormPreview from "./FormPreview";
import { RESET_FORM, SAVE_FORM, UPDATE_FORM } from "@/constants";
import { useEffect } from "react";
import moment from "moment";
import FormSidebarMobile from "./FormSidebarMobile";

const FormMain = () => {
  const { formState, dispatchForms } = useFormContext();
  const { activeForm } = formState;
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    return () => {
      dispatchForms({ type: RESET_FORM });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grow bg-neutral-100 p-6">
      <div className="flex flex-row items-center justify-between p-4 mb-4 border-b border-neutral-300">
        <h1 className="md:text-2xl text-xl font-medium">{activeForm.name}</h1>
        <span className="flex gap-x-2">
          <Button
            variant="outline"
            size="icon"
            className="text-neutral-700"
            onClick={() => {
              setDialogOpen((prev) => !prev);
            }}
          >
            <Pencil />
          </Button>
          <FormSidebarMobile />
        </span>
        <EditTitleDialog
          title={activeForm.name}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
      <div className="flex flex-row items-center justify-end gap-x-2 mb-4">
        <Button
          onClick={() => {
            dispatchForms({
              type: RESET_FORM,
            });
          }}
        >
          NEW FORM
        </Button>
        {formState.forms.find((item) => item.id === formState.activeForm.id) ? (
          <Button
            disabled={
              formState.activeForm.FormElements?.length > 0 ? false : true
            }
            className="bg-green-600 hover:bg-green-700"
            onClick={() => {
              dispatchForms({
                type: UPDATE_FORM,
                payload: formState.activeForm,
              });
            }}
          >
            UPDATE FORM
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={
              formState.activeForm.FormElements?.length > 0 ? false : true
            }
            className="bg-green-600 hover:bg-green-700"
            onClick={() => {
              dispatchForms({
                type: SAVE_FORM,
                payload: {
                  ...formState.activeForm,
                  date: moment(new Date()).toISOString(),
                },
              });
            }}
          >
            SAVE FORM
          </Button>
        )}
      </div>
      <FormPreview />
    </div>
  );
};

export default FormMain;
