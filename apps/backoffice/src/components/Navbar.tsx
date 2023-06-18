import { MenuIcon } from "lucide-react";
import clsx from "clsx";
type Props = {
  /**
   * Allows the parent component to modify the state when the
   * menu button is clicked.
   */
  onMenuButtonClick(): void;
};
const Navbar = (props: Props) => {
  return (
    <nav
      className={clsx({
        "bg-white text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "sm:hidden w-screen md:w-full sticky z-10 px-4 shadow-sm h-[73px] top-0 ":
          true, //positioning & styling
      })}
    >
      <div className="font-bold text-lg">Admin Panel</div>
      <div className="flex-grow"></div>
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <MenuIcon className="h-6 w-6" />
      </button>
    </nav>
  );
};

export default Navbar;
