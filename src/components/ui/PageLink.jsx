import { Link, useLocation } from "react-router-dom";
import { saveReturnState } from "../../utils/navigationState";

export default function PageLink({
  to,
  returnHash = "",
  returnPath,
  className,
  children,
  onClick,
  ...props
}) {
  const location = useLocation();

  const handleClick = (event) => {
    saveReturnState({
      pathname: returnPath ?? location.pathname,
      scrollY: window.scrollY,
      hash: returnHash,
    });

    onClick?.(event);
  };

  return (
    <Link to={to} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
