function getGeoLocation() {
  const location = navigator.geolocation.getCurrentPosition((pos) =>
    console.log(pos)
  );
}

console.log(getGeoLocation());
