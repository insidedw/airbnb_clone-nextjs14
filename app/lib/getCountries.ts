import countries from 'world-countries'

const countriesFormatted = countries
  .map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latLng: country.latlng,
    region: country.region,
  }))
  .sort((a, b) => {
    return a.label.toUpperCase() < b.label.toUpperCase() ? -1 : a.label > b.label ? 1 : 0
  })

export const useCountries = () => {
  const getAllCountries = () => countriesFormatted

  const getCountryByValue = (value: string) => {
    return countriesFormatted.find((item) => item.value === value)
  }

  return {
    getAllCountries,
    getCountryByValue,
  }
}
