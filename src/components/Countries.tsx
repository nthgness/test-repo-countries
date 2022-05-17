import React, { useEffect, useState } from 'react'
import useCountriesService from '../services/useCountries'
import Loader from './Loader'
import { ICountry } from '../types/Country'
import { sortAscending, sortDescending } from '../utils/utils'
import Pagination from "./Pagination";

const Countries: React.FC<{}> = () => {
  const service = useCountriesService()
  const [displayedData, setDisplayedData] = useState<ICountry[]>([]);
  const [countries, setCountries] = useState<any>([])
  const itemsPerPage = 10;
  const allPages = Math.ceil(countries.length / itemsPerPage);


  useEffect(() => {
    if (service.status === 'loaded') {
      setCountries(service.payload)
    }
  }, [service])

  useEffect(() => {
    if (service.status === 'loaded') {
      setDisplayedData(service.payload)
    }
    onPageChange()
  }, [countries.length, countries])


  const onPageChange = (page: number = 1) => {
    const startItem = (page - 1) * itemsPerPage;
    const endItem = page * itemsPerPage;
    setDisplayedData(countries.slice(startItem, endItem))
  }

  const filterByOceaniaRegion = (countries: any[]) => countries.filter((country) => country.region === 'Oceania')

  const filterSmallerCountryByArea = (countries: any[], countryName: string) => {
    const currentCountry = countries.find((country) => country.name === countryName)

    return countries.filter((country => country.area < currentCountry.area))
  }

  return (
    <>
      <div>
        {service.status === 'loading' && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
      </div>
      <div className="controls__container">
        <button className="controls__button" onClick={() => setCountries([...sortAscending(countries)])}>Sort Ascending</button>
        <button className="controls__button" onClick={() => setCountries([...sortDescending(countries)])}>Sort descending</button>
        <button className="controls__button" onClick={() => setCountries([...filterSmallerCountryByArea(countries, 'Lithuania')])}>Filter smaller than Lithuania</button>
        <button className="controls__button" onClick={() => setCountries([...filterByOceaniaRegion(countries)])}>Filter by Oceania region</button>
      </div>
      {displayedData.map((country: ICountry, index:number) => (
        <div className="country__container" key={index}>
          <span>Country name: {country.name}</span>
          <span>Region: {country.region}</span>
          <span>Area: {country.area}</span>
        </div>
      ))}
      <Pagination allPagesNumber={allPages} itemsPerPage={10} itemsNumber={countries.length} pageChange={onPageChange}/>
      {service.status === 'error' && <div>Error</div>}
    </>
  )
}

export default Countries
