// rrd imports
import { Form, NavLink, redirect } from "react-router-dom";

// library
import {
  TrashIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
// (ArrowRightOnRectangleIcon is the logout svg icon)

// assets
import logomark from "../assets/logomark.svg";

const Nav = ({ username }) => {

  return (
    <nav>
      {/* Logo */}
      <NavLink to='/dashboard' aria-label="Go to home">
        <img src={logomark} alt="" height={30} />
        <span>Expense Manager</span>
      </NavLink>

      {/* Show buttons only when user is logged in */}
      {username && (
        <div style={{ display: "flex", gap: "10px" }}>
          {/* Delete User button */}
          <Form
            method="post"
            action="/delete"
            onSubmit={(event) => {
              if (
                !confirm("Do you really want to delete your account and data?")
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn btn--warning">
              <span>Delete User</span>
              <TrashIcon width={20} />
            </button>
          </Form>

          {/* Logout button */}
          <Form method="post" action="/logout">
            <button type="submit" className="btn btn--accent">
              <span>Log out</span>
              <ArrowRightOnRectangleIcon width={20} />
            </button>
          </Form>
        </div>
      )}
    </nav>
  );
};

export default Nav;
