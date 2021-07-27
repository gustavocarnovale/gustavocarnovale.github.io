const db = firebase.database();

window.onload = (event) =>{
    db.ref('visits').once('value', (snapshot) => {
        const info = Object.keys(snapshot.val()).length;
        $("#muestraVisita").val(parseInt(info))
    })

    db.ref('visits').push(1);

    $(".nav-link").on('click', function(){

        $(".collapse").collapse("hide")

    })
}

