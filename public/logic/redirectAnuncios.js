import { itemCount } from './createAndRemoveSpace.js'

async function getTitlesFetch(){
    if(document.getElementById(`1`)){
        try {
            let titles = itemCount
            let content = document.getElementById('inputTitle').value
            let responseTitles = (await fetch(`/ads/posts/${titles}/${content}`))
            let dataTitles = await responseTitles.json()
            dataTitles.titles.forEach((title, index) => {
                index++
                document.getElementById(`titleResult-${index}`).value = title
                //Dispara evento
                const event = new Event('input', { bubbles: true });
                document.getElementById(`titleResult-${index}`).dispatchEvent(event);
            });
        } catch (error) {
            console.error('Erro na API', error)
        }
    } else{
        alert('[ERRO] Nenhum campo aplicável')
    }
}

document.getElementById('search').addEventListener('click', getTitlesFetch)

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && document.activeElement === document.getElementById('inputTitle')) {
        event.preventDefault();
        getTitlesFetch();
    }
});