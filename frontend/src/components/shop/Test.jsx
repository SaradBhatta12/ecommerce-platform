const Test = () => {
  let data = ["ram", "shym", "hari", "dipak"];
  return (
    <div className="ml-14 flex flex-col ga-2">
      {data.map((d) => (
        <label htmlFor="categories">
          <input type="radio" />
          {d}
        </label>
      ))}
    </div>
  );
};
export default Test;
