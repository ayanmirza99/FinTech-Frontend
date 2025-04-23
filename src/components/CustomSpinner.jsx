import { Triangle } from "react-loader-spinner";

const CustomSpinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Triangle
        visible={true}
        height="90"
        width="90"
        color="#3730d9"
        ariaLabel="triangle-loading"
      />
    </div>
  );
};

export default CustomSpinner;
