import HeaderLanding from "@/layout/headerlanding";
import { useAuth } from "@/lib/hooks/useAuth";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";

const RoadmapCard = ({
  imageSrc,
  className,
  title,
}: {
  imageSrc: string;
  className: string;
  title: JSX.Element;
}) => {
  return (
    <div
      className={`mx-auto flex max-h-[230px] max-w-[303px] flex-col whitespace-nowrap pt-7 text-3xl font-bold text-white `}
    >
      <div
        className={`mt-7 flex h-[100%] items-end gap-0 rounded-2xl pb-6 pl-6 ${className}`}
      >
        <div className="mt-6 flex flex-col">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/126d94fae526babc25ef653e6ee57f74070cd0b55e2dd88d3786a00c4516aa06?"
            className="aspect-[0.44] w-2 fill-white"
          />
          <div className="z-10 mt-20">{title}</div>
        </div>
        <img
          loading="lazy"
          src={imageSrc}
          className="z-10 mt-0 aspect-[1.08] w-[180px] max-w-full shrink-0"
        />
      </div>
    </div>
  );
};

export default function HomePage() {
  const navigate = useNavigate();
  const user = useAuth()?.user;

  const handleRoadmapNavigate = () => {
    if (user) {
      navigate("/roadmap");
    } else {
      navigate("/auth");
    }
  };

  return (
    <>
      <HeaderLanding />
      <div className="min-h-screen lg:px-16">
        <div
          className="cover bg-opacity-5 bg-cover bg-no-repeat object-cover pb-8 pt-20 md:pb-[100px] lg:pb-[160px]"
          style={{
            backgroundImage: "url(https://i.imgur.com/mtZi5pL.png)",
          }}
        >
          <div className=" bg-clip-text text-center text-6xl font-bold text-white max-md:mt-10 max-md:max-w-full max-md:text-4xl">
            <span className="text-white">Learn any of</span> <br />
            <span className="bg-gradient-to-b from-sky-300 to-blue-700  bg-clip-text font-extrabold text-transparent">
              2,000,000+
            </span>{" "}
            <span className="text-white">skills</span>
          </div>
          <div className="mt-6 px-2 text-center text-2xl text-zinc-400 max-md:max-w-full">
            We help you develop a detailed and structured plan that will help to
            systematically master the topic being studied without missing
            anything important.
          </div>
          <div className="mt-5 flex justify-center space-x-2 px-2">
            <input
              className="w-fit max-w-[335px] grow items-start justify-center rounded-xl border border-solid border-zinc-500 bg-zinc-50 px-6 py-3 text-zinc-500 max-md:px-5"
              id="learn"
              placeholder="I want to learn ..."
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
            />
            <button
              className="justify-center rounded-xl bg-blue-600 px-6 py-3 text-center text-xs font-medium text-white shadow-sm max-md:px-5 md:text-sm"
              onClick={handleRoadmapNavigate}
            >
              Create the map
            </button>
          </div>
        </div>
        <Marquee speed={100}>
          {[
            "Flavorist",
            "Color expert",
            "Hippotherapy",
            "Toy design",
            "Blockchain",
            "Periodontist",
            "Color expert",
            "Hippotherapy",
            "Toy design",
            "Software Engineer",
          ].map((item) => (
            <span
              key={item}
              className="mr-4 inline-flex items-center rounded-xl px-2 py-1 text-xl   font-medium text-[#666666] ring-2 ring-inset ring-[#707070]"
            >
              {item}
            </span>
          ))}
        </Marquee>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-6 md:grid-cols-3 lg:grid-cols-4">
          <RoadmapCard
            imageSrc="https://i.imgur.com/qhC7y3a.png"
            className="bg-gradient-to-b from-violet-500 to-violet-800"
            title={
              <>
                {" "}
                UI/UX
                <br />
                Designer
              </>
            }
          />
          <RoadmapCard
            imageSrc="https://i.imgur.com/xUFPlOl.png"
            className="bg-gradient-to-b from-orange-300 to-red-400"
            title={
              <>
                <br />
                Gardener
              </>
            }
          />
          <RoadmapCard
            imageSrc="https://i.imgur.com/Etuz4cp.png"
            className="bg-gradient-to-b from-sky-300 to-sky-500"
            title={
              <>
                {" "}
                Project
                <br />
                Manager
              </>
            }
          />
          <RoadmapCard
            imageSrc="https://i.imgur.com/AINh76Y.png"
            className="bg-gradient-to-b from-amber-300 to-amber-500"
            title={
              <>
                {" "}
                Crypto
                <br />
                Traider
              </>
            }
          />
        </div>
      </div>
    </>
  );
}
