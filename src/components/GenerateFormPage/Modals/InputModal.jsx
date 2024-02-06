import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ADD_INPUT_TO_FORM } from "@/constants";
import { useFormContext } from "@/hooks/useFormContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const InputModal = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { dispatchForms } = useFormContext();

  const {
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const requiredMaxValue = watch("inputMinLength")
    ? Number(watch("inputMinLength"))
    : -999;
  const formInputType = watch("inputType");
  const optionalFieldRender = !["number", "date", "time"].includes(
    formInputType
  );

  const submitHandler = (data) => {
    const payloadData = {
      element: "input",
      type: data.inputType,
      label: data.inputLabel,
      placeholder: data.inputPlaceholder,
      id: crypto.randomUUID(),
      validation: {
        required: data.inputRequired,
        minLength: data.inputMinLength,
        maxLength: data.inputMaxLength,
      },
    };

    dispatchForms({
      type: ADD_INPUT_TO_FORM,
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Input Field Form
          </DialogTitle>
          <form onSubmit={handleSubmit(submitHandler)}>
            <ul className="flex flex-col gap-y-4">
              <li className="flex flex-row gap-x-2 items-center mt-4">
                <label htmlFor="inputType">Input Type</label>
                <select
                  id="inputType"
                  {...register("inputType", {
                    required: "Type field is required",
                  })}
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="number">Number</option>
                  <option value="password">Password</option>
                  <option value="tel">Telephone</option>
                  <option value="date">Date</option>
                  <option value="time">Time</option>
                  <option value="url">Url</option>
                </select>
                {errors.inputType && (
                  <span className="text-red-500 text-sm font-extrabold w-full block">
                    *{errors.inputType.message}
                  </span>
                )}
              </li>
              <li className="flex flex-col gap-y-1">
                <label htmlFor="inputLabel">Label</label>
                <input
                  id="inputLabel"
                  type="text"
                  placeholder="label"
                  {...register("inputLabel", {
                    required: "label field is required",
                    minLength: {
                      value: 3,
                      message: "label field should be of atleast 3 characters",
                    },
                  })}
                />
                {errors.inputLabel && (
                  <span className="text-red-500 text-sm font-extrabold w-full block">
                    *{errors.inputLabel.message}
                  </span>
                )}
              </li>
              <li className="flex flex-col gap-y-1">
                <label htmlFor="inputPlaceholder">Placeholder</label>
                <input
                  id="inputPlaceholder"
                  type="text"
                  placeholder="Placeholder"
                  {...register("inputPlaceholder", {
                    required: "Placeholder field is required",
                    minLength: {
                      value: 3,
                      message:
                        "Placeholder field should be of atleast 3 characters",
                    },
                  })}
                />
                {errors.inputPlaceholder && (
                  <span className="text-red-500 text-sm font-extrabold w-full block">
                    *{errors.inputPlaceholder.message}
                  </span>
                )}
              </li>
              {optionalFieldRender && (
                <div className="flex flex-row gap-x-2">
                  <li className="grow">
                    <label htmlFor="inputMinLength">Min Length</label>
                    <input
                      id="inputMinLength"
                      type="number"
                      placeholder="Min length"
                      {...register("inputMinLength", {
                        min: {
                          value: 0,
                          message: "Min length Value should be atleast 0",
                        },
                      })}
                    />
                  </li>
                  <li className="grow">
                    <label htmlFor="inputMaxLength">Max Length</label>
                    <input
                      id="inputMaxLength"
                      type="number"
                      placeholder="Max length"
                      {...register("inputMaxLength", {
                        min: {
                          value: 0,
                          message: "Max length Value should be atleast 0",
                        },
                        validate: (value) =>
                          value &&
                          requiredMaxValue !== -999 &&
                          requiredMaxValue > value
                            ? "Max length Value should be greater than equal to Min Value"
                            : true,
                      })}
                    />
                  </li>
                </div>
              )}
              {errors.inputMinLength && (
                <span className="text-red-500 text-sm font-extrabold w-full block">
                  *{errors.inputMinLength.message}
                </span>
              )}
              {errors.inputMaxLength && (
                <span className="text-red-500 text-sm font-extrabold w-full block">
                  *{errors.inputMaxLength.message}
                </span>
              )}
              <li className="flex flex-row gap-x-2 items-center">
                <label htmlFor="inputRequired">Is this field required</label>
                <input
                  id="inputRequired"
                  type="checkbox"
                  {...register("inputRequired")}
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

export default InputModal;
