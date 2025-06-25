// import "./NavBar.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// function NavBar() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   // Check token on mount
//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (token) {
//       setIsAuthenticated(true); // true if token exists
//     }
//   }, []);

//   const UserName = Cookies.get("userName");
//   const id = Cookies.get("Id");
//   console.log("id:", id);
//   // console.log(UserName);
//   // console.log(token);
//   // console.log(isAuthenticated);
//   // Logout handler
//   const handleLogout = () => {
//     Cookies.remove("token");
//     setIsAuthenticated(false);
//     navigate("/"); // Redirect to home
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar__logo">
//         <Link to="/">Blog Nest</Link>
//       </div>

//       <ul className="navbar__links">
//         <li>
//           <Link to="/">Home</Link>
//         </li>

//         {isAuthenticated ? (
//           <>
//             <li>
//               <Link to="/add-blog">Add Blog</Link>
//             </li>
//             <li>
//               <Link to={`/MyProfile`}>{UserName}</Link>
//             </li>
//             <li>
//               <button onClick={handleLogout} className="logout-btn">
//                 Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link to="/signup">Signup</Link>
//             </li>
//             <li>
//               <Link to="/login">Log In</Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default NavBar;

import "./NavBar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateAuth = () => {
      const token = Cookies.get("token");
      const storedUserName = Cookies.get("userName");

      if (token) {
        setIsAuthenticated(true);
        setUserName(storedUserName || "");
      } else {
        setIsAuthenticated(false);
        setUserName("");
      }
    };

    updateAuth(); // run once on load

    // Listen to custom auth change events
    window.addEventListener("authChanged", updateAuth);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("authChanged", updateAuth);
    };
  }, [location]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userName");

    window.dispatchEvent(new Event("authChanged")); // notify NavBar

    setMenuOpen(false);
    navigate("/", { replace: true });
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/" onClick={handleLinkClick}>
          Blog Nest
        </Link>
      </div>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className={`navbar__links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <Link to="/add-blog" onClick={handleLinkClick}>
                Add Blog
              </Link>
            </li>
            <li>
              <Link to="/MyProfile" onClick={handleLinkClick}>
                {userName || "Profile"}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup" onClick={handleLinkClick}>
                Signup
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLinkClick}>
                Log In
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
