import { Link } from "react-router-dom";

interface CardDetail {
  id: string,
  name: string,
  image: string,
  temperament: string[],
  year: string
}


export default function Card(card: CardDetail) {
  return (
  <Link to={`/dogdetail/${card.id}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img className="object-cover rounded-t-lg w-48 h-48 md:h-48 md:w-48 md:rounded-none md:rounded-l-lg" src={card.image} alt="" />
      <div className="flex flex-col justify-between p-3 leading-normal">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{`Nombre: ${card.name.length<15 ? card.name : card.name.slice(0,14)+' ...'}`}</h5>
        <p className="text-sm text-gray-700 dark:text-gray-400">{`Id: ${card.id}`}</p>
        <p className="text-sm text-gray-700 dark:text-gray-400">{`Años: ${card.year}`}</p>
        <p className="text-sm text-gray-700 dark:text-gray-400">{`Temperamentos: ${card.temperament}`}</p>
      </div>
    </Link>
  )
}