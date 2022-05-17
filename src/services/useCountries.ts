import { useEffect, useState } from 'react'
import { Service } from '../types/Service';
import { ICountry } from '../types/Country';

const useCountriesService = () => {
    const [result, setResult] = useState<Service<ICountry[]>>({
        status: 'loading'
    })

    useEffect(() => {
        fetch('https://restcountries.com/v2/all?fields=name,region,area')
        .then(response => response.json())
        .then(response => setResult({ status: 'loaded', payload: response }))
        .catch(error => setResult({ status: 'error', error }));
    }, [])

    return result;
}

export default useCountriesService;
