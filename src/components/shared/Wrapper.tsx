const Wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="w-full px-4 sm:px-0 sm:w-3/4  mx-auto  py-8 ">
      {children}
    </div>
  );
};

export default Wrapper;
