let itemCount = 0;

function addSpaceText(){

    if(itemCount <= 5){
        //create element
        const ul = document.getElementById('textAreaAnuncios')
        const template = document.getElementById('litemplate')
        const newLi = template.content.cloneNode(true);
    
        //add id
        newLi.querySelector('#countCaracteres').id = `countCaracteres-${itemCount}`;
        newLi.querySelector('#countPalavras').id = `countPalavras-${itemCount}`;
        newLi.querySelector('#countLines').id = `countLines-${itemCount}`;
        newLi.querySelector('#titleResult').id = `titleResult-${itemCount}`;
        newLi.querySelector('#buttoncopy').id = `buttoncopy-${itemCount}`;
        newLi.querySelector('#li').id = `li-${itemCount}`;
    
        ul.appendChild(newLi)
        itemCount++
    } else{
        alert('[ERRO] Limite máximo de campos atingido.')
    }
}

function removeSpaceText(){
    if (itemCount > 0){
        itemCount--;
        if (document.getElementById(`li-${itemCount}`)){
            const liToRemove = document.getElementById(`li-${itemCount}`)
            liToRemove.remove()
        }
    } else{
        alert('[ERRO] Nenhum item para remover.');
    }
    
}

document.getElementById('createSpaceText').addEventListener('click', addSpaceText)
document.getElementById('removeSpaceText').addEventListener('click', removeSpaceText)