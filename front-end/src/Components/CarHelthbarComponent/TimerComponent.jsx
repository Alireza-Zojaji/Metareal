import { useCarHelthStore } from "@/Zustands/ComponentStore/CarHelthStore";
const CarHelthbarComponent = () => {
  const { healthPoints, maxHealthPoints } = useCarHelthStore();
  return (
    <div className={"fixed top-10 right-10"}>
      {healthPoints < maxHealthPoints ? (
        <>
          <div
            style={{ opacity: ((5 - healthPoints) * 20) / 100 }}
            className="fixed w-screen h-96  bottom-0 left-0 right-0  bg-gradient-to-t from-red-600/70 z-10"
          ></div>
          <div className={"relative"}>
            <div
              className={
                "absolute left-0 h-6 px-4 z-2 top-0 rounded-full bg-red-600 "
              }
            >
              {String(healthPoints)[0]}
            </div>
            <progress
              className="progress progress-error bg-red-900/30 border-red-600 border-2 h-6 w-72"
              value={healthPoints}
              max={maxHealthPoints}
            ></progress>
          </div>
        </>
      ) : (
        <div className={"relative"}>
          <div
            className={
              "absolute left-0 h-6 px-4 z-2 top-0 rounded-full bg-green-700"
            }
          >
            {healthPoints}
          </div>
          <progress
            className="progress progress-success bg-green-900/30 border-green-700 border-2 h-6 w-72"
            value="100"
            max="100"
          ></progress>
        </div>
      )}
      {healthPoints == 0 && (
        <div className="fixed w-screen h-screen  bottom-0 left-0 right-0  bg-gradient-to-t from-red-600/70 z-10">
          <div className="flex justify-center items-center h-full">
            <div className="text-white text-6xl rounded-xl bg-red-800 p-10">
              Game Over
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CarHelthbarComponent;
