import ROUTES from "@/configs/routes";
import { useTheme } from "@/hooks/useTheme.hook";
import Link from "next/link";
import { IoSunny, IoMoon } from "react-icons/io5";

export default function Navbar() {
  const { mode, setTheme } = useTheme();
  return (
    <div className="navbar px-8">
      <div className="navbar-start flex gap-8">
        <Link href={ROUTES.HOME}>TODO List</Link>

        <Link href={ROUTES.BASIC}>Basic</Link>
      </div>
      <div className="navbar-end">
        <label className="swap swap-rotate text-xl">
          <input
            type="checkbox"
            className="theme-controller"
            value="light"
            onChange={() => {
              setTheme(mode === "light" ? "dark" : "light");
            }}
            checked={mode === "light"}
          />
          <IoSunny className="swap-off" />
          <IoMoon className="swap-on" />
        </label>
      </div>
    </div>
  );
}
