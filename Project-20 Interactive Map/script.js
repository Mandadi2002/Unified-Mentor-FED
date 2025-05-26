// Initialize the map centered on Hyderabad
var map = L.map('map').setView([17.385044, 78.486671], 12);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add notable places in Hyderabad with descriptions and images
const places = [
  {
    name: "Charminar",
    coords: [17.3616, 78.4747],
    description: "An iconic 16th-century mosque with four grand arches.",
    image: "images/charminar.jpeg"
  },
  {
    name: "Golconda Fort",
    coords: [17.3833, 78.4011],
    description: "A historic fortress with majestic ruins and scenic views.",
    image: "images/Golconda_Fort_005.jpg"
  },
  {
    name: "Hussain Sagar Lake",
    coords: [17.4239, 78.4738],
    description: "A heart-shaped lake known for its monolithic Buddha statue.",
    image: "images/Hussain Sagar Lake.jpg"
  },
  {
    name: "Ramoji Film City",
    coords: [17.2543, 78.6827],
    description: "A massive film studio complex with tours and activities.",
    image: "images/ramoji-film-city.jpeg"
  },
  {
    name: "Salar Jung Museum",
    coords: [17.3713, 78.4804],
    description: "A museum housing one of the largest art collections in the world.",
    image: "images/Salar jung musem.jpeg"
  },
  {
    name: "Telangana Secretariat",
    coords: [17.4093, 78.4658],
    description: "The administrative headquarters of the state government of Telangana.",
    image: "images/Telangana_Secretariat.jpg"
  },
  {
    name: "Chowmahalla Palace",
    coords: [17.3577, 78.4716],
    description: "Chowmahalla Palace or Chowmahallat is the palace of the Nizams of Hyderabad State located in Hyderabad, Telangana, India. It was the seat of power of the Asaf Jahi dynasty (1720-1948) and was the official residence of the Nizams during their reign. The palace has been converted into a museum and the ownership still lies with the family.",
    image: "images/Chowmahalla_Palace_Architecture.jpg"
  },
  {
    name: "Nehru Zoological Park",
    coords: [17.3511, 78.4450],
    description: "Nehru Zoological Park (also known as Zoo Park) is a zoo located near Mir Alam Tank in Bahadurpura, Telangana, India. It is one of the most visited destinations in Hyderabad.",
    image: "images/Hyderabad_zoo.jpg"
  },
  {
    name: "Birla Mandir",
    coords: [17.4056, 78.4693],
    description: "Birla Mandir is a Hindu temple built on a 280 feet (85 m) high hillock called Naubath Pahad on a 13 acres (53,000 m2) plot in Hyderabad, Telangana, India. The construction took ten years and was opened in 1976 by Swami Ranganathananda of Ramakrishna Mission. The temple was constructed by the Birla Foundation, which has also constructed several similar temples across India, all known as Birla Mandir.",
    image: "images/Birla_Mandir,_Hyderabad.png"
  },
  {
    name: "Osman Sagar",
    coords: [17.3739, 78.2989],
    description: "Osman Sagar was created by damming the Musi River in 1920, to provide an additional source of drinking water for Hyderabad and to protect the city after the Great Musi Flood of 1908. It was constructed during the reign of the last Nizam of Hyderabad State, Osman Ali Khan, hence the name..",
    image: "images/Gandipet.jpg"
  },
  {
    name: "Himayath Sagar",
    coords: [17.3092, 78.3552],
    description: "The construction of reservoirs on the Esi, a tributary of the Musi River, was completed in 1927, with the intention of providing a drinking water source for Hyderabad and protecting the city from floods, which Hyderabad suffered in 1908. It was built during the reign of the last Nizam of Hyderabad, Nizam VII and is named after his eldest son Himayat Ali Khan.",
    image: "images/Himayat_Sagar.jpg"
  },
  {
    name: "NTR Gardens",
    coords: [17.4127, 78.4685],
    description: "The construction of reservoirs on the Esi, a tributary of the Musi River, was completed in 1927, with the intention of providing a drinking water source for Hyderabad and protecting the city from floods, which Hyderabad suffered in 1908. It was built during the reign of the last Nizam of Hyderabad, Nizam VII and is named after his eldest son Himayat Ali Khan.",
    image: "images/500px-NTR_Memorial.jpg"
  },
  {
    name: "Lumbini Park",
    coords: [17.4099, 78.4730],
    description: "Lumbini Park, officially T. Anjaiah Lumbini Park, is a small public, urban park of 3 hectares (7.5 acres) adjacent to Hussain Sagar in Hyderabad, India.",
    image: "images/Lumbini_Park,_Hyderabad.jpg"
  },
  {
    name: "Shilparamam",
    coords: [17.4514, 78.3775],
    description: "Shilparamam, a crafts village, conceived in the year 1992, is situated just about few kilometers from Hyderabad city. Sprawling over 65 acres (260,000 m2) of land in the hi-tech hub city of India, Shilparamam gives a scenic ambience of tradition and cultural heritage.",
    image: "images/shilparamam-hyderabad-tourism-entry-fee-timings-holidays-reviews-header.jpg"
  },
  {
    name: "Sanjeevaiah Park",
    coords: [17.4326, 78.4751],
    description: "Sanjeevaiah Park is a public greenspace and park in the heart of Hyderabad, in Telangana, India. Built on 92 acres (37 ha) along the banks of Hussain Sagar lake, the park is named after Damodaram Sanjivayya, an erstwhile Chief Minister of Andhra Pradesh.",
    image: "images/Caribbean_Trumpet_Tree_(Tabebuia_aurea)_in_Hyderabad_W_IMG_7091.jpg"
  },
  {
    name: "Osmania University",
    coords: [17.4116, 78.5274],
    description: "Osmania University is a collegiate public state university located in Hyderabad, Telangana, India. Mir Osman Ali Khan, the 7th Nizam of Hyderabad, issued a firman calling for its creation on 29 August 1917.",
    image: "images/R.jpeg"
  },
  {
    name: "Maturi Venkata subba Rao Engineering College",
    coords: [17.2816, 78.5394],
    description: "Established in 1981 and affiliated to Osmania University, MVSR Engineering College offers a diverse range of UG and PG programs including B.E., M.E., and MBA. The college stands out as a research center recognized for Ph.D. programs in CSE, ECE, and Mechanical Engineering.",
    image: "images/MVSREC.jpeg"
  },
  {
    name: "Nagarjuna Sagar Dam",
    coords: [16.5753, 79.3120],
    description: "Nagarjuna Sagar Dam is a masonry dam across the Krishna River at Nagarjuna Sagar which straddles the border between Nalgonda district in Telangana and Palnadu district in Andhra Pradesh.",
    image: "images/NagarjunaSagarDam.JPG"
  },
  {
    name: "Srisailam Dam",
    coords: [16.0323, 79.3236],
    description: "The Srisailam Dam is constructed across the Krishna River in Nandyal district, Andhra Pradesh and Nagarkurnool district, Telangana near Srisailam temple town and is the 2nd largest capacity working hydroelectric station in India.[.",
    image: "images/NSRS_Srisailam_Dam.jpg"
  },
  {
    name: "Rajiv Gandhi International Airport",
    coords: [17.2298, 78.4321],
    description: "Rajiv Gandhi International Airport (IATA: HYD, ICAO: VOHS) is an international airport that serves Hyderabad, the capital of the Indian state of Telangana.",
    image: "images/Rajiv_Gandhi_International_Airport_Of_Hyderabad.png"
  },
  {
    name: "Falaknama Palace",
    coords: [17.3318, 78.4659],
    description: "Falaknuma is a former palace and currently a luxury hotel in Hyderabad, Telangana, India.It originally belonged to the Paigah family, and was later owned by the Nizam of Hyderabad. It is on a hillock and covers a 13-hectare (32-acre) area in Falaknuma, 5 kilometres (3.1 mi) from Charminar.",
    image: "images/Falaknuma_Palace_01.jpg"
  },
  {
    name: "Yadigirigutta lakshmi Narasimha swami Temple.",
    coords: [17.5890, 78.9442],
    description: "The Sri Lakshmi Narasimha Swamy Temple or Yadadri or Yadagiri Gutta Devasthanam (YGD), or Pancha Narasimha Kshetram or Rishi Aradhana Kshetram is a Hindu Temple situated on a hillock in the small town of Yadagirigutta in the Yadadri Bhuvanagiri district of the Indian state of Telangana..",
    image: "images/Yadagirigutta-Yadadri-Temple-3.jpg"
  },
  {
  name: "Swarnagiri Temple",
  coords: [17.2943, 78.5106],
  description:" Swarnagiri Sree Venkateswara Swamy Devasthanam is a newly emerging spiritual site with a beautiful and growing pilgrimage spot. It offers spiritual peace and a calm hilltop location. The temple is a must-visit site for devotees of Lord Venkateshwara.",
  image:"images/the-swarnagiri-temple-telengana-v0-ljfbw75kgrtc1.webp"
  },
  {
    name: "Rajiv Gandhi International Cricket Stadium",
    coords: [17.4063, 78.5507],
    description:"The Rajiv Gandhi International Cricket Stadium, commonly known as Uppal Stadium, is an international cricket stadium in Hyderabad, Telangana, India. It is owned and operated by Hyderabad Cricket Association (HCA). It is the home ground of Hyderabad cricket team and Hyderabad women's cricket team.",
    image:"images/rajiv-gandhi-international-cricket-stadium-hyderabad-odi-world-cup-2023-details.jpg"
    },
];

// Add markers for each place
places.forEach(place => {
  const popupContent = `
    <div class="map-popup">
      <strong>${place.name}</strong>
      <p>${place.description}</p>
      <img src="${place.image}" alt="${place.name}" />
    </div>
  `;
  const marker = L.marker(place.coords).addTo(map);
  marker.bindPopup(popupContent);
});

// Add click-to-mark functionality
map.on('click', function(e) {
  var latlng = e.latlng;
  var newMarker = L.marker([latlng.lat, latlng.lng]).addTo(map);
  newMarker.bindPopup(`<div class="map-popup">You clicked at ${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}</div>`).openPopup();
});

// Add the geocoder (search control) to the map
L.Control.geocoder({
defaultMarkGeocode: false
})
.on('markgeocode', function(e) {
var bbox = e.geocode.bbox;
var latlng = e.geocode.center;

// Add marker at the searched location
var marker = L.marker(latlng).addTo(map);
marker.bindPopup(`<div class="map-popup"><strong>${e.geocode.name}</strong></div>`).openPopup();

// Fit the map to the location bounds
map.fitBounds(bbox);
})
.addTo(map);
