import { NavLink } from 'react-router-dom'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { FaStar } from 'react-icons/fa'

const Hero = () => {
  return (
    <section className="relative bg-hero bg-cover bg-center bg-no-repeat h-screen w-full flex items-center">
      <div className="max_padd_container w-full pb-0">
        <h1 className="h1 capitalize max-w-[37rem]">Digital Grocery Shopping Hub</h1>

        <p className="text-gray-50 regular-16 mt-6 max-w-[33rem]">
          ShopSmart brings groceries to your fingertips — fresh, fast, and hassle-free. With a smart, simple interface and reliable delivery, it’s your modern way to shop for everyday essentials.
        </p>

        <div className="flexStart !items-center gap-x-4 my-10">
          <div className="!regular-24 flexCenter gap-x-3">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>

          <div className="bold-16 sm:bold-20">
            176k <span className="regular-16 sm:regular-20">Excellent Reviews</span>
          </div>
        </div>

        <div className="max-xs:flex-col flex gap-2">
          <NavLink to={''} className="btn_dark_rounded flexCenter">
            Shop now
          </NavLink>
          <NavLink to={''} className="btn_dark_rounded flexCenter gap-x-2">
            <MdOutlineLocalOffer className="text-2xl" />
            Offers
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default Hero
