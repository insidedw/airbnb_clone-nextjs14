'use client'

import {MapContainer, Marker, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import {useCountries} from "@/app/lib/getCountries";
import {icon} from "leaflet";


const ICON = icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [50, 50]
})

interface Props {
    location: string
}

export default function Map({location}: Props) {
    const {getCountryByValue} = useCountries()
    const latLng = getCountryByValue(location)?.latLng

    return (
        <MapContainer scrollWheelZoom={false} className={'h-[50vh] rounded-lg relative z-0'}
                      center={latLng ?? [52.505, -0.09]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={latLng ?? [52.505, -0.09]} icon={ICON}/>
        </MapContainer>
    )
}
