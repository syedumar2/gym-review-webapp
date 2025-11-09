import Logo from "../Buttons/Logo";






export const Footer = () => {
  return (
    <footer className="py-12 bg-primary text-secondary">
      <div className="max-w-6xl mx-auto px-4 space-y-6 md:space-y-12">
        <div className="grid grid-cols-12">
          {/* Brand / Logo */}
          <div className="col-span-full md:col-span-6 mb-6 md:mb-0">
       <Logo/>
          </div>

          {/* Explore Links */}
          <div className="col-span-6 text-center md:text-left md:col-span-3">
            <p className="mb-2 text-lg font-medium text-black">Explore</p>
            <ul className="space-y-1 text-black ">
              <li>
                <a href="/" className="hover:text-secondary">
                  Home
                </a>
              </li>
              <li>
                <a href="/listings" className="hover:text-secondary">
                  All Gyms
                </a>
              </li>
              <li>
                <a href="/request-gym" className="hover:text-secondary">
                  Request a Gym
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-secondary">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-secondary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-6 text-center md:text-left md:col-span-3">
            <p className="mb-2 text-lg font-medium text-black">Social</p>
            <ul className="space-y-1 text-black">
              <li>
                <a href="https://github.com/syedumar2" className="hover:text-secondary">
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/syed-umar-152b0a221"
                  className="hover:text-secondary"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:to.syedumar@gmail.com" className="hover:text-secondary">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-center items-center pt-6 border-t border-secondary text-shadow-black text-black font-light text-sm space-y-2 md:space-y-0 md:space-x-2">
          <span>© 2025 GymReview. All rights reserved.</span>
          <span>Designed by Syed Umar</span>
        </div>
      </div>
    </footer>
  );
};

//TODO (LOW): Update the footer links
