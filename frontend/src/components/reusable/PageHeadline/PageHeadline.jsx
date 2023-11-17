export const PageHeadline = ({ children, className }) => {
  return (
    <h1 className={`${className} font-semibold text-lg mt-2`}>{children}</h1>
  );
};
