import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const navMenus = [
  {
    id: "navmenu-1",
    name: "Forms List",
    link: "/",
  },
  {
    id: "navmenu-2",
    name: "Generate Form",
    link: "/generateform",
  },
];

const Navigation = () => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between h-[75px] px-8 bg-neutral-800 shadow-md">
      <Link to="/">
        <h1 className="text-white text-3xl font-semibold px-4 sm:px-0">
          Form Generator
        </h1>
      </Link>
      <nav className="flex gap-2">
        {navMenus.map((nav) => (
          <Button
            key={nav.id}
            variant="link"
            className={`text-neutral-200 font-medium text-lg`}
          >
            <Link to={nav.link}>{nav.name}</Link>
          </Button>
        ))}
      </nav>
    </header>
  );
};

export default Navigation;
