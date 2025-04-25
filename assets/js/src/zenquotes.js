//Fetch quote from zenquotes 


document.querySelector('#zenquotes').addEventListener('click', getApi);



export async function getApi() {
  const apiUrl = "https://zenquotes.io/api/random/";
  const url ="https://api.codetabs.com/v1/proxy?quest="+apiUrl;
  
  const response = await fetch(url);
  var data = await response.json();

  //posts quote and the author into DOM
  document.querySelector('#postQuote').textContent = data[0].q
  document.querySelector('#zenAuthor').textContent = `—${data[0].a}`
}

