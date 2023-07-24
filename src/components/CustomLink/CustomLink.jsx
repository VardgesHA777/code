import { Link, useMatch, useResolvedPath } from "react-router-dom";
import classNames from "classnames";
import "./styles.scss";

const CustomLink = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved?.pathname, end: true });

  return (
    <Link
      className={classNames("custom-link", match && "active-custom-link")}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
