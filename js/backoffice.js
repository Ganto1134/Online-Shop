let link = "https://striveschool-api.herokuapp.com/api/product/"
let api = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkY2U1YzgxODQ0MjAwMTUzNzU4NzYiLCJpYXQiOjE3MTUzMzg4MDIsImV4cCI6MTcxNjU0ODQwMn0.61LsthTlA6qbPWrEiJHdLxujG-2vLTxdY6hDwY4dhRw"

let addressBarContent = new URLSearchParams(window.location.search + "?")
let eventId = addressBarContent.get('eventID') 
 
if (eventId) {
    document.getElementsByTagName('h2')[0].innerText =
      'Edit card'
    document.querySelectorAll('.nav-link')[1].innerHTML = 'Edit Product'
    document.getElementById('save-button').innerText = 'Edit Product'
    let deleteButton = document.getElementById('delete-button')
    let cancelButton = document.getElementById('deleteBtn')
    cancelButton.classList.remove('d-none')

    deleteButton.addEventListener('click', () => {
      fetch(link + eventId, {
        method: 'DELETE',
        headers: {
            "Authorization": api
        }
      })
        .then((res) => {
          if (res.ok) {
            location.assign('./index.html')
          } else {
            throw new Error("Problema nell'eliminazione")
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })

    fetch(link + eventId, {
        headers: {
            "Authorization": api
        }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error("Errore nel recupero dell'evento")
        }
      })
      .then((event) => {
        console.log(
          'Dati carta singola',
          event
        )
        document.getElementById('name').value = event.name
        document.getElementById('description').value = event.description
        document.getElementById('price').value = event.price
        document.getElementById('brand').value = event.brand
        document.getElementById('img').value = event.imageUrl
      })
      .catch((error) => {
        console.log(error)
      })
  } 

  const eventForm = document.getElementById('event-form')
  eventForm.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log('invio i dati')

    let nameInput = document.getElementById('name')
    let descriptionInput = document.getElementById('description')
    let priceInput = document.getElementById('price')
    let brandInput = document.getElementById('brand')
    let imgInput = document.getElementById('img')

    let newEvent = {
      name: nameInput.value,
      description: descriptionInput.value,
      price: priceInput.value,
      brand: brandInput.value,
      imageUrl: imgInput.value
    }
    console.log('evento pronto da inviare', newEvent)

    fetch(eventId ? link + eventId : link, {
      method: eventId ? 'PUT' : 'POST',
      body: JSON.stringify(newEvent), 
      headers: {
        "Authorization": api,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          location.assign('/index.html') 
        } else {
          throw new Error('Write all the informatio needed')
        }
      })
      .catch((err) => {
        console.log(err)

        let warning = document.createElement('div');
        warning.classList.add('alert', 'alert-danger');
        warning.textContent = err.message;
        document.getElementById('event-form').prepend(warning);

      })
  })

   
  let resetBtn = document.querySelector('#reset-button')
  resetBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    eventForm.reset()
  }) 