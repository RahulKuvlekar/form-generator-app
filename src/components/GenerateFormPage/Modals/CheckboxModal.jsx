// import React from "react";
{
  /* <input {...register("checkbox")} type="checkbox" value="A" />
      <input {...register("checkbox")} type="checkbox" value="B" />
      <input {...register("checkbox")} type="checkbox" value="C" /> */
}
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ADD_DROPDOWN_TO_FORM } from "@/constants";
import { useFormContext } from "@/hooks/useFormContext";
import { Fragment, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Minus } from "lucide-react";

const CheckboxModal = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { dispatchForms } = useFormContext();

  const {
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    control,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      checkboxFields: [{ value: "" }],
    },
  });
  const requiredCheckboxFieldType = watch("checkboxFieldType");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "checkboxFields",
  });

  const submitHandler = (data) => {
    const payloadData = {
      element:
        data.checkboxFieldType === "single"
          ? "checkbox-single"
          : "checkbox-multiple",
      label: data.checkboxLabel,
      fields: data.checkboxFields.map((field) => field.value),
      id: crypto.randomUUID(),
      validation: {
        required: data.checkboxRequired,
      },
    };

    dispatchForms({
      type: ADD_DROPDOWN_TO_FORM,
      payload: payloadData,
    });

    setModalOpen(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <div
          key={item.id}
          className="p-4 text-center border-b hover:bg-neutral-100 cursor-pointer"
        >
          {item.name}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Checkbox Field form
          </DialogTitle>
          <form onSubmit={handleSubmit(submitHandler)}>
            <ul className="flex flex-col gap-y-4">
              <li className="flex flex-row gap-x-2 items-center mt-4">
                <label htmlFor="checkboxFieldType">Checkbox Fields</label>
                <select
                  id="checkboxFieldType"
                  {...register("checkboxFieldType", {
                    required: "Type field is required",
                  })}
                >
                  <option value="single">Single</option>
                  <option value="multiple">Multiple</option>
                </select>
                {errors.checkboxFieldType && (
                  <span className="text-red-500 text-sm font-extrabold w-full block">
                    *{errors.checkboxFieldType.message}
                  </span>
                )}
              </li>
              <span>
                <strong>* Single</strong> - Will provide only 1 select option
                and output will be in true/false
              </span>
              <span>
                <strong>* Multiple</strong> - Will provide multiple select
                options and output will be the selected options
              </span>
              <li className="flex flex-col gap-y-1">
                <label htmlFor="checkboxLabel">Label</label>
                <input
                  id="checkboxLabel"
                  type="text"
                  placeholder="label"
                  {...register("checkboxLabel", {
                    required: "label field is required",
                    minLength: {
                      value: 3,
                      message: "label field should be of atleast 3 characters",
                    },
                  })}
                />
                {errors.checkboxLabel && (
                  <span className="text-red-500 text-sm font-extrabold w-full block">
                    *{errors.checkboxLabel.message}
                  </span>
                )}
              </li>
              {requiredCheckboxFieldType === "multiple" && (
                <label>Field Options</label>
              )}
              {requiredCheckboxFieldType === "multiple" && (
                <Fragment>
                  {fields.map((item, index) => (
                    <Fragment key={`checkbox-options-${index}`}>
                      <li
                        key={item.id}
                        className="flex flex-row items-center gap-x-3 "
                      >
                        <Fragment>
                          <input
                            className="grow"
                            {...register(`checkboxFields.${index}.value`, {
                              required: "Option is required",
                            })}
                          />
                          {index > 0 && (
                            <Button
                              variant="outline"
                              size="icon"
                              type="button"
                              onClick={() => remove(index)}
                            >
                              <Minus />
                            </Button>
                          )}
                        </Fragment>
                      </li>
                      {errors.checkboxFields?.[index]?.value && (
                        <span className="text-red-500 text-sm font-extrabold w-full block">
                          *{errors?.checkboxFields?.[index]?.value?.message}
                        </span>
                      )}
                    </Fragment>
                  ))}
                </Fragment>
              )}
              {requiredCheckboxFieldType === "multiple" && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => append({ value: "" })}
                >
                  Add New Option
                </Button>
              )}
              <li className="flex flex-row gap-x-2 items-center">
                <label htmlFor="checkboxRequired">Is this field required</label>
                <input
                  id="checkboxRequired"
                  type="checkbox"
                  {...register("checkboxRequired")}
                />
              </li>
              <li className="text-right">
                <Button type="submit" disabled={isSubmitting}>
                  Save
                </Button>
              </li>
            </ul>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CheckboxModal;
