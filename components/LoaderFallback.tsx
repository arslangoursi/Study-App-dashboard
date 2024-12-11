import Loader from "@/components/Loader";

const LoaderFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw"
    }}
  >
    <Loader />
  </div>
);

export default LoaderFallback;
