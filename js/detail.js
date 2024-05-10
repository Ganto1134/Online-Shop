let link = "https://striveschool-api.herokuapp.com/api/product/"
let api = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkY2U1YzgxODQ0MjAwMTUzNzU4NzYiLCJpYXQiOjE3MTUzMzg4MDIsImV4cCI6MTcxNjU0ODQwMn0.61LsthTlA6qbPWrEiJHdLxujG-2vLTxdY6hDwY4dhRw"

let addressBarContent = new URLSearchParams(window.location.search + "?")
let eventId = addressBarContent.get('eventID') 

        let imgCard = document.querySelector('.card img')
        let body = document.querySelector('.card')
        let nome = body.querySelector('.card-title')
        let prezzo = document.getElementById('price')
        let description = document.getElementById('description')
        let brand = body.querySelector('span')

const details = () => {
    fetch(link + eventId,  {
        headers: {
            Authorization: api
        }
    }
        )
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error("Errore nel recupero dell'evento")
        }
        })
    .then((data) => {
        console.log(data);
        imgCard.src = data.imageUrl
        nome.innerHTML = data.name
        prezzo.innerHTML = data.price + ',00$'
        description.innerHTML = data.description 
        brand.innerHTML = data.brand

    })
}

window.onload = () => {
    let spinner = document.getElementById('spinner')
    let container = document.getElementById('container')
    const spinners = function(){
       spinner.remove()
       container.classList.remove('d-none')
    }
setTimeout(spinners, 1000)
setTimeout(details, 1000)
}
