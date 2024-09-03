const Wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="w-full px-4 sm:px-0 sm:w-[80%] mx-auto my-16 py-12 ">
      {children}
    </div>
  );
};

export default Wrapper;
