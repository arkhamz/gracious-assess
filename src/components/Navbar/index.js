import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import Overlay from "../Overlay";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function toggleOverlay(e) {
    setOpen(true);
  }

  function closeOverlay(e) {
    setOpen(false);
  }

  return (
    <nav>
      <ul className="links">
        <Link to="/">Home</Link>
        <Link to="/episodes">Episodes</Link>
        <li
          style={{ cursor: "pointer" }}
          onClick={toggleOverlay}
          className="plumbus"
        >
          <p>?</p>
        </li>
      </ul>
      {open && <Overlay closeOverlay={closeOverlay} />}
    </nav>
  );
}
