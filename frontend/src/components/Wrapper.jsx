import Slidebar from "./sub-comp/Slidebar";

const Wrapper = ({ children }) => {
  return (
    <div>
      <Slidebar /> {children}
    </div>
  );
};
export default Wrapper;
