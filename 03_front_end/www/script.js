const formElement = document.getElementById("saveTransaction");

var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    let metrosc = document.getElementById("metrosc").value;
    let tipodesuperficie =document.getElementById("tipodesuperficie").value;
    let horario =document.getElementById("horario").value;
    let transaction = {
      mts2 : parseInt(metrosc),
      area_category: tipodesuperficie,
      turn_category : horario
    };
    let transactionJson = JSON.stringify(transaction);
    const url = "http://localhost:8000/predict"
    
    let dd = "?mts2=" + metrosc + "&area_category=" + tipodesuperficie + "&turn_category=" + horario
    
    // getJSON(url + dd,
    // function(err, data) {
    //   if (err !== null) {
    //     alert('Something went wrong: ' + err);
    //   } else {
    //     console.log(data)
    //     var div = document.getElementById('response_api');
    //     div.innerHTML = JSON.parse(data);
    //   }
    // });

  fetch(url + dd)
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then((data) => {
    console.log(data)
    // var div = document.getElementById('response_api');
    // div.innerHTML = data;
    let text = "<table style='border:0px solid black;margin-left:auto;margin-right:auto;'>"
    for (let x in data) {
      text += "<tr><td><b>" + x + ":</b></td><td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td><td>" + data[x] + "</td></tr><tr></tr>";
    }
    text += "</table>"
    document.getElementById("response_api").innerHTML = text;
  });
})