import { Link } from 'react-router-dom'
import FOOTER_LINKS from '../assets/footer_links'
import FOOTER_CONTACT_INFO from '../assets/footer_contact'
import SOCIALS from '../assets/socials'

const Footer = () => {
  
  return (
    <footer className="flexCenter pb-24 pt-20">
      <div className="max_padd_container flex w-full flex-col gap-14">

        {/* Top Section: Brand + All Columns (side by side) */}
        <div className="flex flex-col items-start justify-center md:flex-row gap-[10%]">
          <Link to="/" className="mb-10 bold-20">ShopSmart</Link>

          <div className="flex flex-wrap gap-8 sm:justify-between md:flex-1">
            {/* Footer Links */}
            {FOOTER_LINKS.map((col) => (
              <FooterColumn title={col.title} key={col.title}>
                <ul className="flex flex-col gap-4 regular-14 text-gray-20">
                  {col.links.map((link) => (
                    <Link to="/" key={link}>{link}</Link>
                  ))}
                </ul>
              </FooterColumn>
            ))}

            {/* Contact Us */}
            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
              <ul className="flex flex-col gap-4 regular-14 text-gray-20">
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <li key={link.label} className="flex flex-col sm:flex-row gap-2">
                    <p>{link.label}:</p>
                    <p className="medium-14">{link.value}</p>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            {/* Social Icons */}
            <FooterColumn title="">
              <ul className="flex gap-4">
                {SOCIALS.links.map((link) => (
                  <Link to="/" key={link}>
                    <img src={link} alt="socialIcon" height={22} width={22} />
                  </Link>
                ))}
              </ul>
            </FooterColumn>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="w-full border-t border-gray-300 pt-2 mt-4">
          <p className="text-center regular-14 text-gray-30 mt-4">
            © 2024 ShopSmart | All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

const FooterColumn = ({ title, children }) => {
  return (
    <div>
      {title && <h4 className="bold-16 mb-4 text-gray-800">{title}</h4>}
      {children}
    </div>
  )
}

export default Footer
