import FormMain from "./FormMain";
import FormSidebar from "./FormSidebar";

const GenerateFormPage = () => {
  return (
    <section className="flex flex-row h-[calc(100vh-75px)] border-b">
      <FormMain />
      <FormSidebar />
    </section>
  );
};

export default GenerateFormPage;
