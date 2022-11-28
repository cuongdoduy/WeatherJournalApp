/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();
// Prepare API
const APIkey="&appid=b0df923fe22b20b64ac181d4eb968f81&units=imperial";
const baseURL="https://api.openweathermap.org/data/2.5/weather?zip=";
// Selector
let arr=[];
const generate = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
//getData function
const getData = async(baseURL,userZip,personalAPI) => {
    const response= await fetch(baseURL + userZip + personalAPI);
    try 
    {
        const data= await response.json();
        return data;
    }
    catch(error)
    {
        console.log(error);

    }
}
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    //console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML ='Temperature today is '+ Math.round(allData.Temp)+ ' degrees';
    document.getElementById('content').innerHTML ='Your feelings: '+ allData.Feel;
    document.getElementById("date").innerHTML ='Today is '+allData.Date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }


generate.addEventListener('click',function(){

    getData(baseURL,zip.value,APIkey)
    .then((data)=>{
        return {Temp:data.main.temp,Date:`${newDate}`,Feel:`${feelings.value}`};
    })
    .then((data)=>{
        postData('/all',data);
    })
    .then(()=>{
        retrieveData();
    }
    )
});



