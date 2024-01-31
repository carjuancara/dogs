
import Card from "../Card/Card";

import useMovePage from '../../hooks/useMovePage'
export default function Cards() {
  const { currentDogs } = useMovePage()

  return (
    <div className="p-5 min-h[40vh] bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto py-1 px-2 sm:px-2 lg:px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {currentDogs?.map((d) => (
            <Card
              key={d.id ? d.id : d.ApiID}
              id={String(d.id ? d.id : d.ApiID)}
              name={d.name}
              image={d.image}
              year={d.year}
              temperament={
                typeof d.temperament === "string"
                  ? d.temperament.split(",")
                  : d.temperament
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}