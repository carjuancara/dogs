import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import image from "../../image/icono.jpg";
import { useDogStore } from "../../store/dogStore-origin";
export default function NavBar() {
  const [name, setName] = useState("");
  const location = useLocation().pathname
  const { getRazaByName, cleanDogDetail } = useDogStore();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getRazaByName(name);
    setName('')
  };

  return (

    <nav className="dark:bg-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/home" className="flex items-center">
          <img src={image} className="h-12 mr-3 w-12 rounded-md" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Dog</span>
        </Link>
        <div className="flex md:order-2">
          <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" /* stroke-linejoin="round" */ strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Buscar</span>
          </button>
          <div className="relative hidden md:block">
            {location === '/home' ?
              <div>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <form onSubmit={handleSubmit}>
                  <input type="text" value={name} name="search" autoFocus placeholder="Buscar Raza" onChange={(e) => { setName(e.target.value); }} autoComplete="off" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </form>
              </div>
              :
              <div className='flex justify-end items-center w-full h-10 pr-60'>
                <Link
                  to='/home'
                  className='flex h-10 px-4 rounded-lg text-neutral-900 gap-4 items-center bg-amber-400 '
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3'
                    />
                  </svg>
                  Volver al inicio
                </Link>
              </div>
            }

          </div>
          {location === '/home' ?
            <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" /* stroke-linejoin="round" */ strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            :
            ""
          }
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" /* stroke-linejoin="round" */ strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
          </div>
          {
            location === '/home' ?

              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800">
                <li>
                  <Link to="/home">
                    <span className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:bg-gray-800" aria-current="page">Inicio</span>
                  </Link>
                </li>
                <li>
                  <Link onClick={() => cleanDogDetail()} to="/newdog">
                    <span className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:bg-gray-800">Nueva Raza</span>
                  </Link>
                </li>
                <li>
                  <Link to="/atribuciones">
                    <span className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:bg-gray-800">Atribuciones</span>
                  </Link>
                </li>
              </ul>
              :
              ""
          }
        </div>
      </div>
    </nav>

  )
}
