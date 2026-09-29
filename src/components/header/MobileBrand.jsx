import { Link } from "react-router-dom";
import { focusRing } from "../../styles/ui.js";

function MobileBrand() {
  return (
    <Link
      to="/"
      aria-label="TheBridge home"
      className={`shrink-0 rounded-lg lg:hidden ${focusRing}`}
    >
      <img
        src={`${import.meta.env.BASE_URL}assets/brand/thebridge-logo.svg`}
        alt=""
        className="h-7 w-9 object-contain dark:hidden"
      />
      <img
        src={`${import.meta.env.BASE_URL}assets/brand/thebridge-logo-dark.svg`}
        alt=""
        className="hidden h-7 w-9 object-contain dark:block"
      />
    </Link>
  );
}

export default MobileBrand;
