import React, {useEffect, useState} from 'react'
import useCountriesService from '../services/useCountries'
import Loader from './Loader'
import {ICountry} from '../types/Country'
import Pagination from "./Pagination";

const Countries: React.FC<{}> = () => {
    const service = useCountriesService()
    const [displayedData, setDisplayedData] = useState<ICountry[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([])
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

    const sortAscending = (data: ICountry[]) => data.sort((a: { name: string }, b: { name: string }) => 0 - (a.name > b.name ? -1 : 1));
    const sortDescending = (data: ICountry[]) => data.sort((a: { name: string }, b: { name: string }) => 0 - (a.name > b.name ? 1 : -1));

    const filterByOceaniaRegion = (countries: ICountry[]) => setCountries(countries.filter((country) => country.region === 'Oceania'))

    const filterSmallerCountryByArea = (countries: ICountry[], countryName: string): void => {
        const currentCountry = countries.find((country) => country.name === countryName);

        currentCountry !== undefined && setCountries(countries.filter((country => country.area < currentCountry.area)))
    }

    return (
        <>
            <div>
                {service.status === 'loading' && (
                    <div className="loader__container">
                        <Loader/>
                    </div>
                )}
            </div>
            <div className="controls__container">
                <button className="controls__button" onClick={() => setCountries([...sortAscending(countries)])}>Sort
                    Ascending
                </button>
                <button className="controls__button" onClick={() => setCountries([...sortDescending(countries)])}>Sort
                    descending
                </button>
                <button className="controls__button"
                        onClick={() => filterSmallerCountryByArea(countries, 'Lithuania')}>Filter
                    smaller than Lithuania
                </button>
                <button className="controls__button"
                        onClick={() => filterByOceaniaRegion(countries)}>Filter by Oceania region
                </button>
            </div>
            {displayedData.map((country: ICountry, index: number) => (
                <div className="country__container" key={index}>
                    <span>Country name: {country.name}</span>
                    <span>Region: {country.region}</span>
                    <span>Area: {country.area}</span>
                </div>
            ))}
            <Pagination allPagesNumber={allPages} itemsPerPage={10} itemsNumber={countries.length}
                        pageChange={onPageChange}/>
            {service.status === 'error' && <div>Error</div>}
        </>
    )
}

export default Countries
