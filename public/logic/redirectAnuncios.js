import { itemCount } from './createAndRemoveSpace.js'

function verifyInput(){
    if(document.getElementById('inputTitle').value !== ''){
        getTitlesFetch()
    }else{
        alert('Campo conteúdo vazio')
    }
}


async function getTitlesFetch(){
    if(document.getElementById(`1`)){
        try {
            document.getElementById('search').src = '../assets/loading-search.svg'
            let titles = itemCount
            let content = document.getElementById('inputTitle').value
            let contentURI = encodeURIComponent(content)
            let responseTitles = await fetch(`/ads/posts/${titles}/${contentURI}`)
            let dataTitles = await responseTitles.json()
            setTimeout(() => {  
                dataTitles.titles.forEach((title, index) => {
                    index++
                    document.getElementById(`titleResult-${index}`).value = title
                    //Dispara evento
                    const event = new Event('input', { bubbles: true });
                    document.getElementById(`titleResult-${index}`).dispatchEvent(event);
                });
                document.getElementById('search').src = '../assets/bubble-search-white.png'
            }, 1000);
        } catch (error) {
            console.error('Erro na API', error)
        }
    } else{
        alert('[ERRO] Nenhum campo aplicável')
    }
}

document.getElementById('search').addEventListener('click', verifyInput)

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && document.activeElement === document.getElementById('inputTitle')) {
        event.preventDefault();
        verifyInput();
    }
});