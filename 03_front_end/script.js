const formElement = document.getElementById("saveTransaction");


async function  callApi(url, data){
  const response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(data)
  });
  return response.json()
}
formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    let metrosc = document.getElementById("metrosc").value;
    let tipodesuperficie =document.getElementById("tipodesuperficie").value;
    let horario =document.getElementById("horario").value;
    let transaction = {metrosc : metrosc, tipodesuperficie : tipodesuperficie, horario : horario };
    let transactionJson = JSON.stringify(transaction);
    console.log(transactionJson);
    
    let url = "http://localhost:8000/predict"
    const response =fetch(url,{
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body:  transactionJson
    })
    
    
})