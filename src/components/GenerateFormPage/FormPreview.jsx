import { useFormContext } from "@/hooks/useFormContext";

const FormPreview = () => {
  const { formState } = useFormContext();
  const formElements = formState.activeForm.FormElements;

  return (
    <ul className="flex flex-col gap-y-6 overflow-y-auto pb-6 max-h-[calc(100vh-250px)] hideScrollbar">
      {formElements.map((item) => {
        switch (item.element) {
          case "input":
            return (
              <li key={`${item.id}-form-preview`} className="flex flex-col">
                <label htmlFor={item.id}>
                  {item.validation.required ? "*" : ""}
                  {item.label}
                </label>
                <input
                  id={item.id}
                  type={item.type}
                  placeholder={item.placeholder}
                />
              </li>
            );

          case "select":
            return (
              <li
                key={`${item.id}-form-preview`}
                className="flex flex-row gap-x-2 items-center mt-4"
              >
                <label htmlFor={item.id}>{item.label}</label>
                <select id={item.id}>
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
              </li>
            );

          case "checkbox-single":
            return (
              <li className="flex flex-row gap-x-2 items-center">
                <label htmlFor={item.id}>
                  {item.validation.required ? "*" : ""}
                  {item.label}
                </label>
                <input id={item.id} type="checkbox" />
              </li>
            );

          case "checkbox-multiple":
            return (
              <li className="flex flex-col">
                <label>
                  {item.validation.required ? "*" : ""}
                  {item.label}
                </label>

                {item?.fields?.map((field, index) => (
                  <div
                    className="flex flex-row gap-x-3"
                    key={`${index}-${item.id}`}
                  >
                    <input id={index} type="checkbox" value={field} />
                    <label htmlFor={index}>{field}</label>
                  </div>
                ))}
              </li>
            );

          case "radio": {
            return (
              <li key={`${item.id}-form-preview`} className="flex flex-col">
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
                      name={item.label}
                      id={option}
                      value={option}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </li>
            );
          }
          default:
            break;
        }
      })}
    </ul>
  );
};

export default FormPreview;
