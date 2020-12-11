/* Skriv din kod här */
//api url
const URL = "https://restcountries.eu/rest/v2/all";

//gör ett anrop till API:n
fetch(URL).then(
    function(response){
        return response.json();
    }
).then(
    function(data){
        //skapar en array där jag kommer lägga in de 3 landen med hjälp av en for loop
        let countries = [];

        for(let i = 0; i<3; i++){
            let random = Math.floor(Math.random() * data.length);
            let randCountry = data[random];
            //lägger till 3 random land i min coutries array
            countries.push(
                new Country(randCountry.name, randCountry.timezones[0], randCountry.flag)
            );
        }
        //selecta alla element som behövs och lägger sedan till datan med hjälp av en forloop
        let countryIMG = document.querySelectorAll('img');
        let countryName = document.querySelectorAll('h1');
        let countryTime = document.querySelectorAll('h3');
        for(let i = 0; i < 3; i++){
        countryIMG[i].src = countries[i].flag;
        countryName[i].innerText = countries[i].name;
        countries[i].displayTime(countryTime[i])
        }    
       
}).catch(
    function(error){
        if(error === "not found"){
            console.log('something went wrong')
        }
    }
);

//mall för Land med namn, tidszon och flagga som parametrar/egenskaper
function Country(_name, _tZone, _flag){
    this.name = _name;
    this.tZone = _tZone;
    this.flag = _flag;
}

//skapa en proto-metod som räknar ut och visar vad den lokala tiden är i en spcifik tidszon
Country.prototype.displayTime = function(timeContainer){
    const date = new Date();
    const UTCHour = date.getUTCHours();
    const minutes = date.getMinutes();
    const offSet = parseInt(this.tZone.substring(3,6));
    //räkna ut tiden 
    const localTime = UTCHour + offSet + ":" + minutes;
    //lägger till den lokala tiden i DOM
    timeContainer.innerText = localTime; 
}

//kan inte lösa hur jag ska göra när det blir - eller exakt på UTC, har ingen tankekraft eller självkänsla kvar :(

