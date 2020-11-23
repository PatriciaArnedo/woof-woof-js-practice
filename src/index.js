/*
- FETCH AND LOAD ALL DOGS INTO SPANS IN THE DOG BAR /X

- CLICK ON DOGS IN THE DOG BAR TO SEE MORE INFO ABOUT THE GOOD PUPPER; /X
  MORE INFO INCLUDES A DOG PIC, A DOG NAME, AND A DOG BUTTON THAT /X

- INDICATES WHETHER IT IS A GOOD DOG OR A BAD DOG; /X
  CLICK ON GOOD DOG/BAD DOG BUTTON IN ORDER TO TOGGLE PUP GOODNESS; /X

- CLICK ON "FILTER GOOD DOGS" BUTTON IN ORDER TO JUST SEE GOOD DOGS  /X
  OR SEE ALL DOGS IN DOG BAR. /X
  */

  //------------code Begins-------------//

  //target element to append doggos to  /X
  //make fetch /X
  //make render doggo span function /X

  const pupBar = document.querySelector("#dog-bar")
  const dogInfo = document.querySelector("#dog-info")
 

  fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(pups => {
        console.log(pups)
        pups.forEach(pup => {addPupToBar(pup)})
    })

    function addPupToBar(pup) {
        let pupSpan = document.createElement("span")
        pupSpan.dataset.id = pup.id
        pupSpan.dataset.status = pup.isGoodDog
        pupSpan.textContent = pup.name

        pupSpan.addEventListener("click", function() {
            
            buttonText = () => {
                if (pup.isGoodDog){
                return "Good Dog!"
            } else if (!pup.isGoodDog){
                return "Bad Dog!"
            }}
            
            dogInfo.innerHTML = ""
            dogInfo.innerHTML = `
                <img src=${pup.image}>
                <h2>${pup.name}</h2>
                <button>${buttonText()}</button> `
            
            const dogButton = document.querySelector("#dog-info button")
            dogButton.dataset.id = pup.id

            dogButton.addEventListener("click", function(event) {
                console.log(event)
                let newStatus;
                let id = event.target.dataset.id
                if (event.target.innerText.includes("Good")) {
                    event.target.innerText = "Bad Dog!"
                    newStatus = false
                } else if (event.target.innerText.includes("Bad")){
                    event.target.innerText = "Good Dog!"
                    newStatus = true
                }

                fetch(`http://localhost:3000/pups/${id}`,{
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        isGoodDog: newStatus
                    })
                })
                .then(response => response.json())
        })

        })

        pupBar.append(pupSpan)
        //debugger
    }

//target element to add event listener to /X
//add event listenr /X
//target element to add doggo properties to /X
//display dog info when target is clicked /X


const dogFilter = document.querySelector("#good-dog-filter")

dogFilter.addEventListener("click", function(event){
    const dogList = Array.from(document.querySelectorAll("span"))
    
    if (dogFilter.innerText.includes("OFF")){
        dogFilter.innerText = "Filter Good Dogs: ON"
        dogList.filter(dog => dog.dataset.status === "false").forEach(function(dog){
            dog.style.display = "none"
        })
    } else {
        dogFilter.innerText = "Filter Good Dogs: OFF"
        dogList.forEach(function(dog){
            dog.style.display = ""
        })
    }
    console.log(dogList.map(x => x.dataset.status))
    console.log(dogList.filter(dog => dog.dataset.status === "false").length)
})

