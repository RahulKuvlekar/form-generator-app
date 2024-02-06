import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ADD_DROPDOWN_TO_FORM, ADD_RADIO_TO_FORM } from "@/constants";
import { useFormContext } from "@/hooks/useFormContext";
import { Fragment, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Minus } from "lucide-react";

const RadioModal = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { dispatchForms } = useFormContext();
  const {
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues: {
      radioOptions: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "radioOptions",
  });

  const submitHandler = (data) => {
    const payloadData = {
      element: "radio",
      label: data.radioLabel,
      options: data.radioOptions.map((option) => option.value),
      id: crypto.randomUUID(),
      validation: {
        required: data.radioRequired,
      },
    };

    dispatchForms({
      type: ADD_RADIO_TO_FORM,
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
            Radio Field form
          </DialogTitle>
          <form onSubmit={handleSubmit(submitHandler)}>
            <ul className="flex flex-col gap-y-4">
              <li className="flex flex-col gap-y-1">
                <label htmlFor="radioLabel">Label</label>
                <input
                  id="radioLabel"
                  type="text"
                  placeholder="label"
                  {...register("radioLabel", {
                    required: "label field is required",
                    minLength: {
                      value: 3,
                      message: "label field should be of atleast 3 characters",
                    },
                  })}
                />
                {errors.radioLabel && (
                  <span className="text-red-500 text-sm font-extrabold w-full block">
                    *{errors.radioLabel.message}
                  </span>
                )}
              </li>
              <label>Radio Options</label>
              {fields.map((item, index) => (
                <Fragment key={`radio-options-${index}`}>
                  <li
                    key={item.id}
                    className="flex flex-row items-center gap-x-3 "
                  >
                    <span>{index + 1} . </span>
                    <input
                      className="grow"
                      {...register(`radioOptions.${index}.value`, {
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
                  </li>
                  {errors.radioOptions?.[index]?.value && (
                    <span className="text-red-500 text-sm font-extrabold w-full block">
                      *{errors?.radioOptions?.[index]?.value?.message}
                    </span>
                  )}
                </Fragment>
              ))}
              <Button
                variant="outline"
                type="button"
                onClick={() => append({ value: "" })}
              >
                Add New Option
              </Button>
              <li className="flex flex-row gap-x-2 items-center">
                <label htmlFor="radioRequired">Is this field required</label>
                <input
                  id="radioRequired"
                  type="checkbox"
                  {...register("radioRequired")}
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

export default RadioModal;
