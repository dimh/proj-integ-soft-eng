function validar (){
    //capturar los valores de los campos
    metrosc = document.getElementById("metrosc").value;
    tipodesuperficie = document.getElementById("tipodesuperficie").value;
    horario = document.getElementById("horario").value;

    //validacion para que sea solo numero

    if (metrosc.length==0 || /^\s+$/.test(metrosc.length) || isNaN(metrosc)){
        alert("Inserte numeros enteros");
    }

    
    //validacion para los no vacio

    if (tipodesuperficie.length==0 || /^\s+$/.test(tipodesuperficie.length) ){
        alert("Seleciones un tipo de superficie")

    }
    if (horario.length==0 || /^\s+$/.test(horario.length) ){
        alert("Seleciones una jornada")

    }

    
}