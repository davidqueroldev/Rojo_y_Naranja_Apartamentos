The hero listing card for each apartment — photo, identity-coloured name, capacity, amenities and price-from with a CTA. Use in the landing grid and "otros apartamentos" sections.

```jsx
<ApartmentCard
  tone="oro"
  nombre="Ático Oro"
  media={<img src="oro.jpg" alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />}
  capacidad="2 personas"
  soloAdultos
  amenities={['Jacuzzi', 'Terraza 16m²', 'Chimenea', 'Wifi']}
  precioDesde={130}
  ctaLabel="Ver detalles"
/>
```

`media` accepts any node — an `<img>`, an `<image-slot>` placeholder, or a plain colour block. `tone` sets the bottom identity seam. `soloAdultos` shows the restriction badge over the photo.
