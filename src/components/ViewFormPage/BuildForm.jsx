import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Fragment, useState, useEffect } from "react";
import SubmitFormModal from "./SubmitFormModal";

const BuildForm = ({ formItem }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState();

  const submitHandler = (data) => {
    setData(data);
    setDialogOpen(true);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  return (
    <Fragment>
      <form
        className="flex flex-col gap-y-6 px-8"
        onSubmit={handleSubmit(submitHandler)}
      >
        {formItem?.FormElements?.map((item) => {
          switch (item.element) {
            case "input":
              return (
                <li key={`${item.id}-form-build`} className="flex flex-col">
                  <label htmlFor={item.id}>
                    {item.validation.required ? "* " : ""}
                    {item.label}
                  </label>
                  <input
                    id={item.id}
                    type={item.type}
                    placeholder={item.placeholder}
                    {...register(item.id, {
                      minLength:
                        item.validation.minLength === ""
                          ? {}
                          : {
                              value: item.validation.minLength,
                              message: `${item.label} should be more than ${item.validation.minLength} character`,
                            },
                      maxLength:
                        item.validation.maxLength === ""
                          ? {}
                          : {
                              value: item.validation.maxLength,
                              message: `${item.label} should be less than ${item.validation.maxLength} character`,
                            },
                      required: item.validation.required
                        ? `${item.label} required`
                        : false,
                    })}
                  />
                  {errors[item.id] && (
                    <span className="text-red-500 text-sm font-extrabold w-full block">
                      *{errors[item.id].message}
                    </span>
                  )}
                </li>
              );

            case "select":
              return (
                <li
                  key={`${item.id}-form-build`}
                  className="flex flex-row gap-x-2 items-center mt-4"
                >
                  <label htmlFor={item.id}>{item.label}</label>
                  <select
                    id={item.id}
                    {...register(item.id, {
                      required: item.validation.required
                        ? `${item.label} is required`
                        : false,
                    })}
                  >
                    {item?.options?.map((option, index) => (
                      <option
                        key={`${item.id}-options-${index}`}
                        value={option}
                        className="capitalize"
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors[item.id] && (
                    <span className="text-red-500 text-sm font-extrabold w-full block">
                      *{errors[item.id].message}
                    </span>
                  )}
                </li>
              );

            case "checkbox-single":
              return (
                <li
                  key={`${item.id}-form-build`}
                  className="flex flex-row gap-x-2 items-center"
                >
                  <label htmlFor={item.id}>
                    {item.validation.required ? "* " : ""}
                    {item.label}
                  </label>
                  <input id={item.id} type="checkbox" {...register(item.id)} />
                  {errors[item.id] && (
                    <span className="text-red-500 text-sm font-extrabold w-full block">
                      *{errors[item.id].message}
                    </span>
                  )}
                </li>
              );

            case "checkbox-multiple":
              return (
                <li key={`${item.id}-form-build`} className="flex flex-col">
                  <label>
                    {item.validation.required ? "* " : ""}
                    {item.label}
                  </label>

                  {item?.fields?.map((field, index) => (
                    <div
                      className="flex flex-row gap-x-3"
                      key={`${index}-${item.id}`}
                    >
                      <input
                        id={index}
                        type="checkbox"
                        value={field}
                        {...register(item.id, {
                          required: item.validation.required
                            ? `${item.label} is required`
                            : false,
                        })}
                      />
                      <label htmlFor={index}>{field}</label>
                    </div>
                  ))}
                  {errors[item.id] && (
                    <span className="text-red-500 text-sm font-extrabold w-full block">
                      *{errors[item.id].message}
                    </span>
                  )}
                </li>
              );

            case "radio": {
              return (
                <li key={`${item.id}-form-build`} className="flex flex-col">
                  <label className="mb-2">
                    {item.validation.required ? "*" : ""}
                    {item.label}
                  </label>
                  {item?.options?.map((option, index) => (
                    <div
                      key={`${index}-radio-options-${item.id}`}
                      className="flex flex-row gap-x-3"
                    >
                      <input
                        type="radio"
                        id={option}
                        value={option}
                        {...register(item.id, {
                          required: item.validation.required
                            ? `${item.label} is required`
                            : false,
                        })}
                      />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  ))}
                  {errors[item.id] && (
                    <span className="text-red-500 text-sm font-extrabold w-full block">
                      *{errors[item.id].message}
                    </span>
                  )}
                </li>
              );
            }

            default:
              break;
          }
        })}
        <Button
          type="submit"
          className="max-w-[200px] bg-green-600 hover:bg-green-700 mb-6"
        >
          Submit
        </Button>
      </form>
      <SubmitFormModal
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={data}
        formItem={formItem}
      />
    </Fragment>
  );
};

export default BuildForm;
