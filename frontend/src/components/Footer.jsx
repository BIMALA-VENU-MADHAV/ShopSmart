import { Link } from "react-router-dom";
import FOOTER_LINKS from "../assets/footer_links";
import FOOTER_CONTACT_INFO from "../assets/footer_contact";
import SOCIALS from "../assets/socials";

const Footer = () => {

  return (
    <footer className="bg-white border-t border-slate-200 mt-10">

      <div className="max_padd_container py-14 sm:py-20">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* BRAND */}
          <div className="lg:col-span-2">

            <Link
              to="/"
              className="bold-28 text-secondary tracking-tight"
            >
              ShopSmart
            </Link>

            <p className="text-gray-600 mt-5 max-w-[28rem] leading-7 text-sm sm:text-base">
              ShopSmart delivers fresh groceries and daily essentials with a
              smooth, modern, and hassle-free shopping experience.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-4 mt-8">

              {SOCIALS.links.map((link) => (
                <Link
                  to="/"
                  key={link}
                  className="w-11 h-11 rounded-full border border-slate-200 flexCenter bg-white hover:bg-secondary hover:border-secondary transition-all duration-300 group"
                >
                  <img
                    src={link}
                    alt="socialIcon"
                    className="w-5 h-5 group-hover:brightness-0 group-hover:invert"
                  />
                </Link>
              ))}

            </div>

          </div>

          {/* FOOTER LINKS */}
          {FOOTER_LINKS.map((col) => (
            <FooterColumn
              title={col.title}
              key={col.title}
            >

              <ul className="flex flex-col gap-4">

                {col.links.map((link) => (
                  <Link
                    to="/"
                    key={link}
                    className="text-gray-600 text-sm sm:text-base hover:text-secondary transition-all duration-300"
                  >
                    {link}
                  </Link>
                ))}

              </ul>

            </FooterColumn>
          ))}

          {/* CONTACT */}
          <FooterColumn title={FOOTER_CONTACT_INFO.title}>

            <ul className="flex flex-col gap-5">

              {FOOTER_CONTACT_INFO.links.map((link) => (
                <li
                  key={link.label}
                  className="flex flex-col gap-1"
                >

                  <span className="text-gray-400 text-sm">
                    {link.label}
                  </span>

                  <span className="text-gray-700 text-sm sm:text-base font-medium">
                    {link.value}
                  </span>

                </li>
              ))}

            </ul>

          </FooterColumn>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-slate-200 mt-14 pt-7 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-sm text-center">
            © 2026 ShopSmart. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">

            <Link
              to="/"
              className="hover:text-secondary transition-all duration-300"
            >
              Privacy Policy
            </Link>

            <Link
              to="/"
              className="hover:text-secondary transition-all duration-300"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

const FooterColumn = ({ title, children }) => {

  return (
    <div>

      <h4 className="text-lg font-bold text-tertiary mb-6">
        {title}
      </h4>

      {children}

    </div>
  );
};

export default Footer;