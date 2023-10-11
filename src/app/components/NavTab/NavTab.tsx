import Link from "next/link";

const NavTab = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href={"/"}>feed</Link>
          </li>
          <li>
            <Link href={"/"}>feed</Link>
          </li>
          <li>
            <Link href={"/"}>feed</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavTab;
