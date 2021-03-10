import Loader from "react-loader-spinner";
import { Overlay } from "./styles";

export const LoaderComponent = ({ active }) => {
    return (
        <Overlay active={active}>
            <Loader type="TailSpin" color="#00BFFF" height={150} width={150} />
        </Overlay>
    );
};

export default LoaderComponent;
