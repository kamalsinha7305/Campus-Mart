import { memo, forwardRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../Hooks/useWishlist";
import toast from "react-hot-toast";

const ProductCard = memo(
  forwardRef(
  ({ product, showRemoveButton = false, onRemove, onRemoveError }, ref) => {
    const { toggleWishlist, removeFromWishlist, checkProductInWishlist } = useWishlist();
    const [inWishlist, setInWishlist] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!product) return null;

    const { _id, title, images, category, selling_price, original_price } =
      product;

    useEffect(() => {
      const checkWishlist = async () => {
        // First check backend to ensure accurate state on mount
        const inWish = await checkProductInWishlist(_id);
        setInWishlist(inWish);
      };
      checkWishlist();
    }, [_id, checkProductInWishlist]);

    const imageUrl =
      images && images.length > 0 ? images[0] : "/assets/image10.png";
    const discount =
      original_price && original_price > selling_price
        ? original_price - selling_price
        : 0;

    const handleClick = () => {
      window.scrollTo(0, 0);
    };

    const handleWishlistClick = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      setLoading(true);
      try {
        const result = await toggleWishlist(_id, product);
        setInWishlist(result);
        if (result) {
          toast.success("Added to Wishlist", { id: "wishlist-toast" });
        } else {
          toast.success("Removed from Wishlist", { id: "wishlist-toast" });
        }
      } catch (error) {
        toast.error("Failed to update wishlist", { id: "wishlist-error" });
        console.error("Wishlist error:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleRemoveClick = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Optimistic update - remove immediately from UI
      setInWishlist(false);
      onRemove?.(_id);
      toast.success("Removed from Wishlist", { id: "wishlist-remove" });

      // Make API call in background without blocking UI
      try {
        await removeFromWishlist(_id);
      } catch (error) {
        // Revert if API fails
        setInWishlist(true);
        onRemoveError?.(_id);
        toast.error("Failed to remove from wishlist", { id: "wishlist-error" });
        console.error("Remove error:", error);
      }
    };

    return (
      <Link
        ref={ref}
        onClick={handleClick}
        to={`/product/${_id}`}
        className="lg:w-[28vw] xl:w-[21vw] w-[44.7vw] md:w-[29vw] rounded-xl overflow-hidden shadow-[0px_4.115523815155029px_28.808666229248047px_0px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1.03px] outline-zinc-300 hover:shadow-sm animation duration-300 ease-linear hover:scale-105 dark:bg-[#121212] dark:shadow-[0px_4.115523815155029px_28.808666229248047px_0px_rgba(0,0,0,0.10)] dark:outline dark:outline-1 dark:outline-offset-[-1.03px] dark:outline-zinc-600"
      >
        <div className="md:p-3 p-2 w-full h-[22vh] md:h-[21vh] lg:h-[19vh] xl:h-[40vh] object-contain relative">
          {showRemoveButton ? (
            <button
              onClick={handleRemoveClick}
              disabled={loading}
              className="absolute flex items-center justify-center lg:w-10 w-7 lg:h-10 h-7 right-5 top-5 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-red-50 transition-all duration-300 group"
              aria-label="Remove from wishlist"
              title="Remove from wishlist"
            >
              <FaHeart className="lg:w-4 w-3 lg:h-4 h-3 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
            </button>
          ) : (
            <button
              onClick={handleWishlistClick}
              disabled={loading}
              className="absolute flex items-center justify-center lg:w-10 w-7 lg:h-10 h-7 right-5 top-5 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              aria-label="Add to wishlist"
            >
              {inWishlist ? (
                <FaHeart className="lg:w-4 w-3 lg:h-4 h-3 text-pink-500 transition-colors duration-300" />
              ) : (
                <FaRegHeart className="lg:w-4 w-3 lg:h-4 h-3 text-gray-400 hover:text-pink-500 transition-colors duration-300" />
              )}
            </button>
          )}

          <div className="bg-[#394FF1] outline outline-1 outline-offset-[-1.14px] outline-black/10 text-white px-2 py-1 rounded md:text-sm text-[2.9vw] font-medium shadow-md font-poppins absolute md:bottom-6 md:left-6 lg:px-4 bottom-4 left-4">
            {category}
          </div>

          <img
            className="rounded-lg w-full h-full"
            src={imageUrl}
            alt={title}
            loading="lazy"
          />
        </div>

        <h1 className="md:pb-2 xl:pb-3 pb-1 pl-4 lg:text-[1.6vw] xl:text-[1.3vw] text-xs font-semibold text-[#313131] font-inter xl:mt-1 dark:text-white">
          {title}
        </h1>
        <div className="flex md:gap-2 gap-5 pl-4">
          <div className="bg-[#E5FDDF] dark:bg-[#0D3804] px-2 py-1 rounded xl:text-sm md:text-[1.4vw] text-[2.7vw] text-[#319F43] dark:text-[#37B24C] font-semibold font-inter flex items-center xl:gap-2 gap-1">
            <span>4.0</span>
            <span>
              <FaStar />
            </span>
          </div>
        </div>

        <div className="pl-3 pr-3 xl:mt-4 lg:mt-3 lg:pb-6 md:mt-4 mt-3 pb-3 flex flex-col">
          <div className="flex items-center lg:gap-2 gap-2">
            <h2 className="text-zinc-800 font-inter xl:text-2xl lg:text-xl font-bold text-sm md:text-base flex items-center justify-center tracking-tight dark:text-white">
              <span className="mr-[-0.2vw]">
                <MdOutlineCurrencyRupee />
              </span>
              <span>{selling_price}</span>
            </h2>
            <h2 className="text-neutral-400 font-inter lg:text-sm font-medium md:text-sm text-xs flex items-center line-through justify-center tracking-tight">
              <span className="mr-[-0.2vw]">
                <MdOutlineCurrencyRupee />
              </span>
              <span>{original_price}</span>
            </h2>
          </div>
          {discount > 0 && (
            <div className="flex items-center pl-1">
              <h2 className="text-[#06981E] font-inter lg:text-sm font-bold md:text-xs text-[2.8vw] flex items-center">
                <span>Save</span>
                <div className="flex items-center">
                  <span className="mr-[-0.2vw]">
                    <MdOutlineCurrencyRupee />
                  </span>
                  <span>{discount}</span>
                </div>
              </h2>
            </div>
          )}
        </div>
      </Link>
    );
  }),
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
