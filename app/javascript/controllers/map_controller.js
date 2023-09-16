import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array,
    centre: Object
  }

  connect() {
    console.log("working map")

    mapboxgl.accessToken = this.apiKeyValue

    const centre = this.centreValue

    console.log(centre.lat)
    console.log(centre.lng)

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v12"
    })
    this.#addMarkersToMap()
    this.#addCentreToMap(centre)
    console.log("fitting to markers")
    this.#fitMapToMarkers()
  }

  #addCentreToMap(centre) {
    new mapboxgl.Marker()
      .setLngLat([ centre.lng, centre.lat ])
      .addTo(this.map)
      console.log("adding to map")
  }

  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html)
      new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(this.map)
    })
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }

  // Production To make it work on Heroku, push your MapBox API Key:
  // heroku config:set MAPBOX_API_KEY=pk.eyJ1IjoicGR1b****************yZvNpTR_kk1kKqQ

}
