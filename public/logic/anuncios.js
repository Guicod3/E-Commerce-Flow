function putText(){
    let itemCount = 0
    const title = document.getElementById('inputTitle').value
    while(document.getElementById(`li-${itemCount}`)){
        document.getElementById(`titleResult-${itemCount}`).textContent = ''
        document.getElementById(`titleResult-${itemCount}`).textContent = title

        itemCount++
    }
}

document.getElementById('search').addEventListener('click', putText)