export function fetchPosts() {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const endpoint = proxy + 'https://aud-tech-challenge.s3.eu-central-1.amazonaws.com/challenge.json';

  return fetch(endpoint)
    .then(res => res.json())
    .then((data) => {
      if (!data) {
        throw new Error(data.message)
      }      
      return data
    })
} 
