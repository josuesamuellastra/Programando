const getPokemon = async (offset=0, limit=5)=>{
   
    let pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
    pokemons = await pokemons.json();
    //console.log(pokemons)
    if(pokemons.results){
        for (let index = 0; index < pokemons.results.length; index++) {
            const pokedata =  await fetch(pokemons.results[index].url);
            pokemons.results[index].data = await pokedata.json();
        }
    }
    return pokemons;
}



const setPokemonAletorioDOM = (AletorioPokemon)=>{
    let $divAleatorio = document.querySelector('.owl-carousel');
    $($divAleatorio).trigger('destroy.owl.carousel');
    let html = ``;
    $divAleatorio.innerHTML = html;
   console.log(AletorioPokemon)

    for(let i=0; i<AletorioPokemon.results.length ; i++){
       //console.log(AletorioPokemon.results[i].data)
       html += `
       <div class="owl-carousel-info-wrap item active ${i==4?'center':''} ">
           <img src="${AletorioPokemon.results[i].data.sprites.front_default}">
           <div class="name-verified-container" style="display: flex; align-items: center; justify-content: center;">
               <h3 class="mb-2" style="margin-right: 10px;">
                   ${AletorioPokemon.results[i].name}
               </h3>
               <img src="images/verified.png" class="owl-carousel-verified-image img-fluid" alt="">
           </div>
           <div class="carousel-caption d-none d-md-block">
           </div>
       </div>
       `;
        }
        $divAleatorio.innerHTML = html;
        $($divAleatorio).owlCarousel({
            center: true,
            loop: true,
            margin: 30,
            autoplay: true,
            responsiveClass: true,
            responsive:{
                0:{
                    items: 2,
                },
                767:{
                    items: 3,
                },
                1200:{
                    items: 4,
                }
        
            }

          });


}

window.addEventListener('load', async function (){
    // Espera a que el elemento .aletaorio esté presente en el DOM
    const waitForElement = async () => {
        const $divAleatorio = document.querySelector('.aletaorio');
        if ($divAleatorio) {
            // Elemento encontrado, puedes proceder
            let min = 1;
            let max = 1200;
            let aleatorio = Math.floor(Math.random() * (max - min)) + min;
            let AletorioPokemon = await getPokemon(aleatorio, 10);
            setPokemonAletorioDOM(AletorioPokemon);
        } else {
            // Elemento aún no presente, espera y verifica nuevamente
            setTimeout(waitForElement, 100); // Revisa cada 100ms
        }
    };

    // Inicia la espera para el elemento .aletaorio
    waitForElement();
});
