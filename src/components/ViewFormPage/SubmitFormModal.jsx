import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SubmitFormModal = ({ data, formItem, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Submitted Values
          </DialogTitle>
          <div className="mt-6">
            {formItem?.FormElements.map((item, idx) =>
              data?.[item.id] ? (
                <h2 key={`submitted-modal-${idx}`}>
                  <b>{item.label}</b>: {data?.[item.id].toString()}
                </h2>
              ) : (
                ""
              )
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitFormModal;
