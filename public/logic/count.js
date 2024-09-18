const ul = document.getElementById('textAreaAnuncios')

function countTitleAndWordsAndLines (id){
    const title = document.getElementById(`titleResult-${id}`).value
    const tituloArea = document.getElementById(`titleResult-${id}`)

    function countCaracteres(){
        const showCaracteres = document.getElementById(`countCaracteres-${id}`)
        const caracteres = title.length
        showCaracteres.textContent = caracteres

        if (caracteres > 60){
            tituloArea.classList.add('bg-red-200')
        } else if(caracteres === 60){
            tituloArea.classList.remove('bg-red-200')
            tituloArea.classList.add('bg-green-200')

            setTimeout(() => {
                tituloArea.classList.remove('bg-green-200')
            }, 1000);
        } else{
            tituloArea.classList.remove('bg-red-200')
            tituloArea.classList.remove('bg-green-200')
        }
    }

    function countWords(){
        const showPalavras = document.getElementById(`countPalavras-${id}`)
        const palavras = title.split(/\s+/) 
        const numeroPalavras = palavras.filter(palavra =>{ //Cria um array novo apenas com palavras length > 0 
            return palavra.length > 0;
        }).length;

        showPalavras.textContent = numeroPalavras
    }

    function countLines() {
        if (document.getElementById(`titleResult-${id}`).value.length === 0){
            document.getElementById(`countLines-${id}`).textContent = 0
        }else{
            const showLines = document.getElementById(`countLines-${id}`)
            const lines = title.split(/\r?\n/)
            const numeroLinhas = lines.length
            showLines.textContent = numeroLinhas;
        }
    }

    countCaracteres()
    countWords()
    countLines()
}

ul.addEventListener('input', (event) =>{ //Verificar qual textarea recebe input
    if (event.target.tagName === 'TEXTAREA'){
        let li = event.target.closest('li');
        li.addEventListener('input', countTitleAndWordsAndLines(li.id))
    }
})

