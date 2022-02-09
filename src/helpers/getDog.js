export const getDog = async() => {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  if(!response.ok){
    const {status, statusText, url} = response;
    throw new Error(`Error ${status}: ${statusText} in ${url}`);
  }
  const data = await response.json();
  return data;
}