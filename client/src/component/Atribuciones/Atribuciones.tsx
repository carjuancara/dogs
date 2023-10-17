import background from '../../image/background.jpg'
import icono from '../../image/icono.jpg'
import favicon from '../../image/favicon.png'

export default function Atribuciones() {
  return (
    <div className="flex flex-col items-center h-[88.5vh] bg-gray-800"> 
      <h2 className="text-white text-4xl ">Atribuciones</h2>
      <div className="flex flex-col items-center border-red-500 rounded-2xl"> 
        <table className='flex flex-col border-2 border-solid border-gray-600 rounded-lg w-96 px-10 py-4 mt-8'>
          <tr className='flex items-center m-1'>
            <img src={background} alt="" className='w-20 h-20 rounded-lg' />
            <a className="flex items-center border-2 border-orange-400 border-solid w-full h-full mx-2 px-4 rounded-lg bg-yellow-500" href="https://unsplash.com/es/fotos/2k6v10Y2dIg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">Mia Anderson en Unsplash</a>
          </tr>
          <tr className='flex items-center m-1'>
            <img src={icono} alt="" className='w-20 h-20 rounded-lg' />
            <a className="flex items-center border-2 border-orange-400 border-solid w-full h-full mx-2 px-4 rounded-lg bg-yellow-500" href="https://unsplash.com/es/fotos/NE0XGVKTmcA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">Foto de Karsten Winegeart en Unsplash</a>
          </tr>
          <tr className='flex items-center m-1'>
            <img src={favicon} alt="" className='w-20 h-20 rounded-lg' />
            <a className="flex items-center border-2 border-orange-400 border-solid w-full h-full mx-2 px-4 rounded-lg bg-yellow-500" href="https://icons8.com/icon/7tuPVSyL8yYC/parque-para-perros" target="_blank" rel="noopener noreferrer">Parque para perro de Icons8</a>
          </tr>
        </table>
        <section className='flex pt-10'>
          <p className="text-gray-300 text-sm">
            {"\u00a9"} Todas las fotos pertenecen a sus respectivos propietarios, aqui se
            hacen las respectivas atribuciones a cada uno de ellos.
          </p>
        </section>
      </div>
    </div>
  );
}
