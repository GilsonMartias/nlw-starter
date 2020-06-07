/*fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(res){ return res.json()}).then(function(data){ console.log(data)})*/

function populateUfs(){
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  // .then( (res) => {return res.json() })
  .then( res => res.json())
  .then( states => {

    for (const state of states){   

     ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    } 
  })
}
populateUfs()

function getCities (event){
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value


  const indexOfSelectedStates = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedStates].text

  const url=`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  
  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true
  
  fetch(url)
  // .then( (res) => {return res.json() })
  .then( res => res.json())
  .then( cities => {

        for (const city of cities){   

     citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    } 
    citySelect.disabled = false
  })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)


// itens de Coleta
//Pegar todos LI

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem (event) {
  const itemLi =event.target


  //Adicionar ou Remover uma classe com JScript
  itemLi.classList.toggle("selected")

  const itemId =itemLi.dataset.id

  // console.log('ITEM ID: ', itemId)

  //Verificar items selecionados se sim pegar os itens
  const alreadySelected = selectedItems.findIndex	( item => {
    const itemFound = item == itemId
    return itemFound
  })
  
  // se tiver selecionados tirar da selecao

  if (alreadySelected >= 0){
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId //false
      return itemIsDifferent
    })
    selectedItems = filteredItems
  }else{
    // se nao tiver selecionados tirar da selecao
    selectedItems.push(itemId)
  }   
   
  // console.log('selectedItems: ', selectedItems)

  //atualizar os campos escondidos com os dados selecionados
  
  collectedItems.value = selectedItems

  
}





