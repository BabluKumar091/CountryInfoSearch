import React, { useState, useEffect } from 'react'
import countriesData from '../countriesData'
import CountryCard from './CountryCard'

export default function CountriesList({ query, region }) {
  const [visibleCount, setVisibleCount] = useState(20)

  // Reset visibleCount when query or region changes
  useEffect(() => {
    setVisibleCount(20)
  }, [query, region])

  const filteredCountries = countriesData.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase()) &&
    (region === '' || country.region.toLowerCase() === region)
  )

  const showMoreCountries = () => {
    setVisibleCount((prevCount) => prevCount + 20)
  }

  return (
    <>
      <div className="countries-container">
        {filteredCountries.slice(0, visibleCount).map((country) => {
          return (
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              flag={country.flags.png}
              population={country.population}
              region={country.region}
              capital={country.capital?.[0]}
              data={country}
            />
          )
        })}
      </div>
      {visibleCount < filteredCountries.length && (
        <div className="show-more-container">
          <button className="show-more-btn" onClick={showMoreCountries}>
            Show More
          </button>
        </div>
      )}
    </>
  )
}
