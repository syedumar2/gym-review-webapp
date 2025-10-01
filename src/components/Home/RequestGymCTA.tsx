import { Button } from "../ui/button"


const RequestGymCTA = () => {
  return (
     <section className=
    "min-h-[80vh] bg-[url('/images/request-gym-cta.jpg')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 dark:bg-overlay/60 z-0 "></div>

      <div className="relative py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 z-50">
        <div className="max-w-screen-md mt-16">
          <h2 className="hero-heading ">
            Can’t find your gym here?
          </h2>
          <p className="hero-text ">
            Request your gym to be listed on our platform so that people can 
            discover it, share reviews, and help your fitness community grow. 
            Adding your gym is quick, free, and helps more people connect. 
          </p>

          <div className="flex flex-col item-center gap-8 ml-3 mt-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <a 
              href="#request-form" 
              className="inline-flex items-center justify-center  text-lg font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Request a Listing
            </a>
            <Button 
              variant={"secondary"}  className="text-lg !text-white px-6 py-6"          >
              Browse Gyms
            </Button>  
          </div>
        </div>
      </div>
    </section>
  )
}

export default RequestGymCTA
