import SyncLoader from "react-spinners/SyncLoader";
import { FunctionComponent } from "react";
interface LoadingProps {
  message?: string;
}

const LoadingComponent: FunctionComponent<LoadingProps> = ({ message }) => {
  return (
    <div className="fixed bg-loading top-0 left-0 h-full w-screen flex items-center justify-center flex-col z-100">
      {message && (
        <p className="text-texto-principal font-semibold mb-2 max-w-1/2 text-center">
          {message}
        </p>
      )}
      <SyncLoader size={30} />
    </div>
  );
};
export default LoadingComponent;
