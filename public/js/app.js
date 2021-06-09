const  weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')



weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()

    const location = search.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    const endpoint = `http://localhost:3000/weather?address=${location}`


fetch(endpoint)
.then(response => response.json())
.then(data =>{
    if(data.error){
        messageOne.textContent = data.error

    }
    else{
        messageOne.textContent = data.location
        messageTwo.textContent = data.forcast
    }
})
    


})