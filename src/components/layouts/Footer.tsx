const Footer = (): JSX.Element => {
  return (
    <div className="w-full bg-black  text-white flex justify-around absolute ">
      <div className="flex gap-0 md:gap-4 flex-wrap">
        <h1 className="text-2xl font-bold py-2">Developed by</h1>
        <div className="flex flex-wrap">
          <a
            href={"https://linkedin.com/in/nadeem-khan-a083702b9"}
            target="blank"
          >
            <h1 className="text-2xl font-bold py-2 text-[#7af3d9]">
              Nadeem Khan
            </h1>
          </a>{" "}
          <a
            href="https://github.com/nadeemsangrasi/Next-js-Projects.git"
            target="blank"
          >
            <h1 className="text-2xl font-bold py-2 text-[#7af3d9]">
              <span className="text-white md:px-2 px-0">|</span> GITHUB REPO
            </h1>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
