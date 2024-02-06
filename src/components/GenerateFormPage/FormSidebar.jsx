import { formMenus } from "@/constants";
import { Fragment } from "react";

const FormSidebar = () => {
  return (
    <aside className="w-[320px] border-l hidden md:block">
      {formMenus.map((item) => (
        <Fragment key={item.id}>{item.component({ item: item })}</Fragment>
      ))}
    </aside>
  );
};

export default FormSidebar;
