export default async function fetchApi() {
  const resolve = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((response) => response.json());
  return resolve;
}
