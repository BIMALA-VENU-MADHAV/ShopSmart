import { TbArrowRight } from "react-icons/tb";
import { Link } from "react-router-dom";

const ProductHd = ({ product }) => {
  return (
    <div className="flex items-center flex-wrap gap-2 text-sm sm:text-base text-gray-600 mb-8">

      <Link
        to="/"
        className="hover:text-secondary transition-all duration-300"
      >
        Home
      </Link>

      <TbArrowRight className="text-gray-400" />

      <span className="hover:text-secondary transition-all duration-300 cursor-pointer">
        Shop
      </span>

      <TbArrowRight className="text-gray-400" />

      <span className="text-secondary font-semibold capitalize">
        {product.category}
      </span>

      <TbArrowRight className="text-gray-400" />

      <span className="text-tertiary font-semibold capitalize line-clamp-1">
        {product.name}
      </span>

    </div>
  );
};

export default ProductHd;