import { useContext } from "react"
import product_rt_1 from "../assets/product_rt_1.png"
import product_rt_2 from "../assets/product_rt_2.png"
import product_rt_3 from "../assets/product_rt_3.png"
import product_rt_4 from "../assets/product_rt_4.png"
import {MdStar} from "react-icons/md"
import { ShopContext } from "../Context/ShopContext"

const ProductDisplay = (props) => {

    const {product} = props;
    const { addToCart } = useContext(ShopContext);

  return (
    <section>
        <div className="flex flex-col gap-14 xl:flex-row">
            <div className="flex gap-x-2 xl:flex-1">
                <div className="flex flex-col gap-[7px] flex-wrap">
                    <img src={product_rt_1} alt="prdctImg" className="max-h-[99px]" />
                    <img src={product_rt_2} alt="prdctImg" className="max-h-[99px]" />
                    <img src={product_rt_3} alt="prdctImg" className="max-h-[99px]" />
                    <img src={product_rt_4} alt="prdctImg" className="max-h-[99px]" />
                </div>
                <div>
                     <img src={product.image} alt="" />
                </div>
            </div>
        <div className="flex-col flex xl:flex-[1.5]">
            <h3 className="h3 ">{product.name}</h3>
            <div className="flex gap-x-2 text-secondary medium-22">
                <MdStar />
                <MdStar />
                <MdStar />
                <MdStar />
                <p>(111)</p>
            </div>
            <div className="flex gap-x-6 mediu,-20 my-4">
                <div className="line-through">{product.old_price}</div>
                <div className="text-secondary">{product.new_price}.00</div>
            </div>
            <div className="md-4">
                <div  className="flex flex-col gap-y-3 md-4 max-w-[555px">
                   <button onClick={() => {addToCart(product.id)}} className="btn_dark_outline !rounded-none uppercase regular-14 tracking-widest">Add to cart</button>
                   <button className="btn_dark_rounded !rounded-none uppercase regular-14 tracking-widest">Buy now</button> 
                </div>
                <p><span className="medium-16 text-tertiary">Category :</span> Dairy Product | Cheese </p>
            </div>
        </div>
        </div>
    </section>
  )
}

export default ProductDisplay
