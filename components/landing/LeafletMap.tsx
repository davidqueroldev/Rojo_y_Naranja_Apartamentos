'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Coordinates: C/ San Nicolás, 11 · Morella
const LAT = 40.6181
const LNG = -0.1002

export default function LeafletMap() {
  useEffect(() => {
    const container = document.getElementById('ryn-map')
    if (!container || (container as unknown as { _leaflet_id?: number })._leaflet_id) return

    const map = L.map('ryn-map', {
      center: [LAT, LNG],
      zoom: 16,
      scrollWheelZoom: false,
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap · © CARTO',
      maxZoom: 19,
    }).addTo(map)

    // Custom marker with brand colour
    const markerHtml = `
      <div style="
        width: 36px; height: 36px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        background: #AF2C0E;
        border: 3px solid #fff;
        box-shadow: 0 4px 12px rgba(28,25,22,0.25);
      "></div>
    `
    const icon = L.divIcon({
      html: markerHtml,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      className: '',
    })

    L.marker([LAT, LNG], { icon })
      .addTo(map)
      .bindPopup('<strong style="font-family:serif">Rojo y Naranja</strong><br/>C/ San Nicolás, 11 · Morella')

    return () => { map.remove() }
  }, [])

  return <div id="ryn-map" style={{ width: '100%', height: '100%', minHeight: 400 }} />
}
