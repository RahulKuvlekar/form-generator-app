import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from "@/components/ui/sheet";
import { formMenus } from "@/constants";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { MenuSquare } from "lucide-react";

const FormSidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-neutral-700 md:hidden"
        >
          <MenuSquare />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <aside className="border">
            {formMenus.map((item) => (
              <Fragment key={item.id}>
                {item.component({ item: item })}
              </Fragment>
            ))}
          </aside>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default FormSidebarMobile;
