let link = "https://striveschool-api.herokuapp.com/api/product/"
let api = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkY2U1YzgxODQ0MjAwMTUzNzU4NzYiLCJpYXQiOjE3MTUzMzg4MDIsImV4cCI6MTcxNjU0ODQwMn0.61LsthTlA6qbPWrEiJHdLxujG-2vLTxdY6hDwY4dhRw"

const getEventData = function () {
    fetch(link, {
        headers:{
            Authorization: api
        }
    })
        .then((response) => {
            console.log('response', response)
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Errore nel recupero degli eventi!')
            }
        })
        .then((data) => {
            console.log('eventi', data)
            data.forEach(e => {
                let card = `
                <div class="col-12 col-sm-6 col-md-4 col-lg-2 my-3 mx-5 d-flex flex-column justify-content-center align-items-center p-0">            
                    <div class="card rounded">
                        <a href="./detail.html?eventID=${e._id}">
                            <img src="${e.imageUrl}" class="card-img w-100 rounded" alt="pokemon card">
                            </a>
                        <div class="card-body h-50 d-flex flex-column justify-content-center text-black">
                            <h5 class="card-title">${e.name}</h5>
                            <p class="card-text">${e.brand}</p>
                            <p class="card-text">${e.description}</p>
                            <p class="card-text">${e.price} $</p>
                            <div class="row mx-2 d-flex justify-content-center">
                                <a href="./backoffice.html?eventID=${e._id}" class="btn btn-info col-8">Change</a>
                                <a href="#" class="btn btn-success col-8 mt-2">Buy</a>
                            </div>
                        </div>
                    </div>
                </div>
                `
                let body = document.getElementById('space')
                body.innerHTML += card
            });
        })
        .catch((error) => {
            console.log('Qualcosa è andato storto', error)
        })
}

window.onload = () => {
 getEventData()
 }
