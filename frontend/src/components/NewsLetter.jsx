const NewsLetter = () => {
  return (
    <section className="bg-primary py-16 sm:py-20">

      <div className="max_padd_container">

        <div className="bg-white rounded-[30px] sm:rounded-[40px] shadow-xl px-5 sm:px-10 lg:px-16 py-10 sm:py-14 text-center">

          <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold">
            Newsletter
          </span>

          <h2 className="text-[28px] sm:text-[42px] font-bold text-tertiary mt-5 leading-tight">
            Get Exclusive Offers On Your Email 📩
          </h2>

          <p className="text-gray-600 mt-5 text-sm sm:text-base leading-7 max-w-2xl mx-auto">
            Subscribe to our newsletter and stay updated with fresh arrivals,
            discounts, and special grocery deals.
          </p>

          {/* INPUT */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 max-w-2xl mx-auto">

            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-4 rounded-full border border-slate-200 outline-none focus:border-secondary text-sm sm:text-base"
            />

            <button className="btn_secondary_rounded shadow-lg hover:scale-105 transition-all duration-300">
              Subscribe
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default NewsLetter;