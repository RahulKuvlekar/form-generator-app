import { useFormContext } from "@/hooks/useFormContext";
import { useParams } from "react-router-dom";
import BuildForm from "./BuildForm";
import { Fragment } from "react";

const ViewFormPage = () => {
  const { formId } = useParams();
  const { formState: contextFormState } = useFormContext();

  const formItem = contextFormState.forms.find((item) => item.id === formId);
  return (
    <section>
      {formItem ? (
        <Fragment>
          <h1 className="text-2xl font-bold p-4 px-8 border-b border-neutral-300 mb-4">
            {formItem?.name}
          </h1>
          <BuildForm formItem={formItem} />
        </Fragment>
      ) : (
        <h1 className="text-2xl font-bold p-4 px-8 mb-4">
          This Form does not exist !!!
        </h1>
      )}
    </section>
  );
};

export default ViewFormPage;
