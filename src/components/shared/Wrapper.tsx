const Wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="w-full px-4 sm:px-0 sm:max-w-screen-xl mx-auto  py-8 ">
      {children}
    </div>
  );
};

export default Wrapper;
