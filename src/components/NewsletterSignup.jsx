import React from "react";

const NewsletterSignup = () => {
  return (
    <section id="newsletter" className="w-full bg-gray-50 py-20 px-6">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-medcsblue mb-4 text-center">
          Join Our Mailing List
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Get updates on events, projects, and news from MedCS Lab.
        </p>

        <form
          action="https://app.us15.list-manage.com/subscribe/post?u=aa573c5c6584e0bad2882078d&amp;id=4f0dd35398&amp;f_id=00eac2e1f0"
          method="post"
          target="_blank"
          noValidate
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="mce-EMAIL"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="EMAIL"
              id="mce-EMAIL"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medcsblue"
              placeholder="you@example.com"
            />
          </div>

          {/* Hidden bot field */}
          <div
            style={{ position: "absolute", left: "-5000px" }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="b_aa573c5c6584e0bad2882078d_4f0dd35398"
              tabIndex="-1"
              defaultValue=""
            />
          </div>

          <div className="text-center">
            <input
              type="submit"
              name="subscribe"
              id="mc-embedded-subscribe"
              className="px-6 py-3 bg-medcsblue text-white font-medium rounded-lg hover:bg-blue-800 transition cursor-pointer"
              value="Subscribe"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
