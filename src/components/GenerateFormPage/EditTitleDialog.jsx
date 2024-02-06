import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useFormContext } from "@/hooks/useFormContext";
import { UPDATE_FORM_TITLE } from "@/constants";

const EditTitleDialog = ({ title, open, onOpenChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      formTitle: title,
    },
  });

  const { dispatchForms } = useFormContext();

  const submitHandler = (data) => {
    dispatchForms({ type: UPDATE_FORM_TITLE, payload: data.formTitle });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Form Title</DialogTitle>
          <div>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="flex flex-wrap gap-2 items-center"
            >
              {errors.formTitle && (
                <span className="text-red-500 text-sm font-extrabold w-full block">
                  *{errors.formTitle.message}
                </span>
              )}
              <input
                type="text"
                id="form_title_dialog"
                className="grow"
                {...register("formTitle", {
                  minLength: {
                    value: 5,
                    message: "Form title should be more that 4 character",
                  },
                  required: "Form title required",
                })}
                defaultValue={title}
              />
              <Button type="submit" className="justify-self-end">
                Submit
              </Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTitleDialog;
