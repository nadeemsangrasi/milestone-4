const Wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="w-full px-4 sm:px-0 sm:w-[80%] mx-auto  py-16 ">
      <div className="my-16">{children}</div>
    </div>
  );
};

export default Wrapper;
