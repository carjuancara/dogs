import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDogStore } from "../../store/dogStore-origin";

export default function CardDetail() {
  const { id } = useParams();
  const { DogDetail, dogDetail } = useDogStore();

  useEffect(() => {
    if (id && id.length > 6) {
      DogDetail("id", parseInt(id));
    } else if (id !== undefined) {
      DogDetail("ApiID", parseInt(id));
    }
  }, [DogDetail, id])


  return (
    <div className="flex h-[88.5vh] flex-wrap justify-center text-3xl bg-gray-800">
      <div className="flex w-3/4 h-[55vh] mt-12">
        <div className=" block mt-2 mr-4 rounded-lg w-2/4 h-[45vh] border-2 border-gray-400">
          <img className="rounded-lg h-full" src={dogDetail?.image} alt="img not found" />
        </div>
        <div className="flex mt-2 pt-4 flex-col justify-start w-[85vw] h-[45vh] rounded-lg border-2 border-gray-400">
          <div className="flex mb-4 text-white font-bold rounded-xl justify-center">
            <label className="text-white">Dog Details </label>
          </div>
          <div className="flex justify-start pl-1 mx-2 rounded-lg">
            <label className="text-gray-400">
              Dog Name: <span className="pt-2 pl-2 text-lg">{dogDetail?.name}</span>{" "}
            </label>
          </div>
          <div className="flex justify-start pl-1 mx-2 rounded-lg">
            <label className="text-gray-400">
              Id:{" "}
              <span className="pt-2 pl-2 text-lg">{dogDetail.ApiID ? dogDetail.ApiID : dogDetail.id}</span>
            </label>
          </div>
          <div className="flex justify-start pl-1 mx-2 rounded-lg">
            <label className="text-gray-400">Temperaments:</label>
            <span className={dogDetail?.temperament.length > 35 ? " pt-2 pl-2 text-lg text-gray-400" : ""}>
              {dogDetail?.temperament}
            </span>
          </div>
          <div className="flex justify-start pl-1 mx-2 rounded-lg">
            <label className="text-gray-400">
              Weight: <span className="pt-2 pl-2 text-lg">{dogDetail?.weight}</span>
            </label>
          </div>
          <div className="flex justify-start pl-1 mx-2 rounded-lg">
            <label className="text-gray-400">
              Height: <span className="pt-2 pl-2 text-lg">{dogDetail?.height}</span>
            </label>
          </div>
          <div className="flex justify-start pl-1 mx-2 rounded-lg">
            <label className="text-gray-400">
              Years: <span className="pt-2 pl-2 text-lg">{dogDetail?.year}</span>
            </label>
          </div>
        </div>
      </div>
    </div >
  );
}
