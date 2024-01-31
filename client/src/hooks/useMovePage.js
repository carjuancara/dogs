import { useEffect } from 'react'
import { useDogStore } from '../store/dogStore-origin'

const useMovePage = () => {
  const { allDog, backupDog, currentPage } = useDogStore()
  const {prevPage, nextPage, GoToPage, getAllDogs} = useDogStore()

  const CARD_PER_PAGE = 6

  const startIndex = (currentPage - 1) * CARD_PER_PAGE
  const endIndex = startIndex + CARD_PER_PAGE

  const currentDogs = allDog?.slice(startIndex, endIndex)
  const totalPages = Math.ceil(allDog.length / CARD_PER_PAGE)

  const handleNextPage = async () => {
    nextPage()
  }

  const handlePrevPage = async () => {
    prevPage()
  }

  const handleGoToPage = (event) => {
    const pageNumber = parseInt(event.currentTarget.value)
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      GoToPage(pageNumber)
    }
  }

  const handleInputClick = (event) => {
    event.currentTarget.select()
  }

  useEffect(() => {
    if (backupDog.length === 0) getAllDogs()
  }, [backupDog, getAllDogs])

  useEffect(() => {
    if (currentPage !== 1) GoToPage(currentPage)
  }, [currentPage, GoToPage])

  return {
    currentDogs,
    handleNextPage,
    handlePrevPage,
    handleGoToPage,
    handleInputClick,
    currentPage,
    totalPages
  }
}

export default useMovePage
