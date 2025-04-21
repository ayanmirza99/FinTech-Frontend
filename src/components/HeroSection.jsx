import { useNavigate } from "react-router-dom";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { Button } from "./ui/button";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <HeroHighlight containerClassName="bg-gray-100 h-[90vh] dark:bg-gray-900">
      <div className="flex w-full justify-around items-center">
        <section className="w-full md:w-1/2 flex items-start flex-col p-4 md:p-0 md:ml-[4rem]">
          <h1 className="text-6xl uppercase md:text-7xl lg:text-8xl font-semibold leading-[5rem] md:leading-[6rem] lg:leading-[7rem] text-left text-gray-700">
            The best<br /> platform for
            <br />
            <Highlight className="text-indigo-800 text-4xl md:text-5xl lg:text-6xl font-custom">
              Fintech Devs
            </Highlight>
          </h1>
          <h1 className="w-[80%] text-lg pt-6 text-left text-gray-700">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet esse
            dolorum consectetur natus sit, iusto minima eveniet
          </h1>
          <Button
            onClick={() => navigate("/sign-up")}
            variant="default"
            className="mt-2 font-mono font-semibold text-lg"
          >
            Get Started ⋙
          </Button>
        </section>
        <section className="w-1/2 hidden md:flex justify-end items-center">
          <div className="h-full w-full overflow-hidden">
            <img
              src="/hero-img.png"
              alt=""
              className="object-center object-cover h-full w-full"
            />
          </div>
        </section>
      </div>
    </HeroHighlight>
  );
};

export default HeroSection;
