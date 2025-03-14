import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [weather, setWeather] = useState('')
  const [location, setLocation] = useState('')
  
  const getWeather = async() => {
    const api_url = `${process.env.NEXT_PUBLIC_WEATHER_API_URL}current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}`
    
    if (location) {
      try {
        const res = await fetch(api_url)
        const data = await res.json()
        if (data) {
          const api_data = {
            country: data.location.country,
            city: data.location.name,
            temp: data.current.temp_f,
            humidity: data.current.humidity,
            wind: data.current.wind_mph,
            gust: data.current.gust_mph,
            visibility: data.current.vis_miles,
            condition: data.current.condition.text,
            img: data.current.condition.icon
          }
          
          setWeather(<>
            <div className="text-center text-2xl p-2">{api_data.city}</div>
            <div className="flex justify-center">
              <div className="flow-root">
                <div className="float-left"><img src={api_data.img} width="80" height="80" alt="Condition" /></div>
                <div className="float-left text-6xl degrees">{api_data.temp}</div>
              </div>
            </div>
            <div className="text-center text-gray-600">{api_data.condition}</div>
            <div className="flow-root p-2">
              <div className="float-left text-gray-600">Humidity: {api_data.humidity} %</div>
              <div className="float-right text-gray-600">Wind: {api_data.wind} <span className="">mph</span></div>
              <div className="float-left text-gray-600">Visibility: {api_data.visibility} mi</div>
              <div className="float-right text-gray-600">Gust: {api_data.gust} mph</div>
            </div>
          </>)

          setLocation('')

          console.log(data)
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      // Invalid: location is empty
    }
  }

  const handleKeyUp = (key) => {
    if (key === "Enter") {
      getWeather()
    }
  }

  return (
    <>
        <nav className="flex items-center justify-center py-4 bg-gray-100 w-full m-0 opacity-90">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input className="block bg-slate-700 text-white rounded-lg opacity-70 pl-10 p-2" 
            type="text" 
            id="location" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            onKeyUp={(e) => handleKeyUp(e.key)}
            placeholder="Location (ie. Paris)" />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 p-2.5 rounded-lg" id="search" onClick={getWeather}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span className="sr-only">GO</span>
          </button>
        </nav>

        { weather &&
        <div className="flex w-full p-20 justify-center">
          <div className="w-full max-w-xs">
            <div className="mb-4">
              <div className="bg-white shadow-lg rounded-3xl px-8 pt-6 pb-8 mb-4 opacity-80">
                {weather}
              </div>
            </div>
          </div>
        </div>
        }

        <div className="flex justify-center p-20 pt-20 mt-20">
          <div className="flex bg-white rounded-3xl px-4 py-1 color-gray opacity-90 hover:scale-150 transition-all">
            <img className="codrkai-profile object-cover rounded-full w-16 h-16 m-2" src="https://avatars.githubusercontent.com/u/52646391?v=4" alt="codrkai" />
            <div className="text-sm text-gray-400 pt-3">Codr Kai<br />Tutorials</div>
          </div>
        </div>
    </>
  )
}
