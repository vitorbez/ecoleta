function populateUFs () {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((res) => { return res.json() }) //function () {} é a mesma coisa que () => {}, que é chamada de arrow function
    .then( states => {
        
        for( const state of states) {
            ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
        }

        
    })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = `<option value>Selecione a Cidade</option>`
    citySelect.disabled = true //essas duas linhas são usadas para que toda vez que clicarmos para selecionar o estado e 
    // ativarmos o eventlistener, que por sua vez chama a função que criamos getCities, o campo da cidade é resetado e não fica com
    // várias cidades de vários estados

    fetch(url)
    .then((res) => { return res.json() }) //function () {} é a mesma coisa que () => {}, que é chamada de arrow function
    .then( cities => {        
        for( const city of cities) {
            citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false       
    } )

}

 document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)

//Itens de Coleta:
//pegar todos os li's para não repetir linhas de código:

const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectedItems = [] // não será const pois irei mudá-la depois

function handleSelectedItem (event) {
    const itemLi = event.target
   
    itemLi.classList.toggle('selected')  //adiciona ou remove uma classe com javascript

    const itemId = event.target.dataset.id

    //verficiar se existem itens selecionados. Se sim, pegar os itens selecionados:
    const alreadySelected = selectedItems.findIndex( (item) => {
        const itemFound = item == itemId
        return itemFound // isso será true ou false

    }) 

    //se já estiver selecionado e clicarmos, tirar da seleção:
    if(alreadySelected >= 0) { //pois 0 é o primeiro index de uma array. Portanto ele encontrará quando itens tiverem sidos adicionados na array selectedItems
        const filteredItems = selectedItems.filter( (item) => { // a função filter() tira o item da seleção
            const itemIsDifferent = item != itemId
            return false
        })

        selectedItems = filteredItems
    } else {
    //se não estiver selecionado ainda, adicionar à seleção:
    selectedItems.push(itemId)
    }

    //atualizar o campo escondido com os itens selecionados:
    collectedItems.value = selectedItems
    
}
