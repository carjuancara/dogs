import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CardDetail() {
  const { id } = useParams();
  const [ dogDetail, setDogDetail ] = useState({  
      id:"",
      ApiID: "",
      name: "",
      year: "",
      weight: "",
      height: "",
      image: "",
      temperament: ""
    })

useEffect(() => {
  axios(`http://localhost:3001/dogs/${id}`)
    .then(response => response.data)
    .then(response => setDogDetail(response))
}, [id, setDogDetail])


return (
  <div className="flex h-[88.5vh] flex-wrap justify-center text-3xl bg-gray-800">
    <div className="flex w-3/4 h-[55vh] items-center">
      <div className=" block mt-2 mr-4 rounded-lg w-2/4 h-[45vh] border-2 border-gray-400">
        <img className="rounded-lg h-full" src={dogDetail?.image} alt="img not found" />
      </div>
      <div className="flex mt-2 gap-4 flex-col justify-start w-[85vw] h-[45vh] rounded-lg border-2 border-gray-400">
        <div className="flex mb-4 text-white font-bold rounded-xl justify-center">
          <label className="text-white">Detalle de la raza </label>
        </div>
        <div className="flex justify-start pl-1 mx-2 rounded-lg">
          <label className="text-gray-400">
            Raza: <span className="pt-2 pl-2 text-2xlg">{dogDetail?.name}</span>{" "}
          </label>
        </div>
        <div className="flex justify-start pl-1 mx-2 rounded-lg">
          <label className="text-gray-400">
            Id:{" "}
            <span className="pt-2 pl-2 text-2xlg">{dogDetail.ApiID ? dogDetail.ApiID : dogDetail.id}</span>
          </label>
        </div>
        <div className="flex justify-start pl-1 mx-2 rounded-lg">
          <label className="text-gray-400">Temperamento:
          <span className={dogDetail?.temperament.length > 35 ? " pt-2 pl-2 text-2xlg text-gray-400" : "text-gray-400 text-2xlg"}>
            {dogDetail?.temperament}
          </span>
          </label>
        </div>
        <div className="flex justify-start pl-1 mx-2 rounded-lg">
          <label className="text-gray-400">
            Peso: <span className="pt-2 pl-2 text-2xlg">{dogDetail?.weight}</span>
          </label>
        </div>
        <div className="flex justify-start pl-1 mx-2 rounded-lg">
          <label className="text-gray-400">
            Altura: <span className="pt-2 pl-2 text-2xlg">{dogDetail?.height}</span>
          </label>
        </div>
        <div className="flex justify-start pl-1 mx-2 rounded-lg">
          <label className="text-gray-400">
            Años: <span className="pt-2 pl-2 text-2xlg">{dogDetail?.year}</span>
          </label>
        </div>
      </div>
    </div>
  </div >
);
}
