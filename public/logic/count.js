function countTitleAndWordsAndLines (){
    const title = document.getElementById('title-input').value
    const tituloArea = document.getElementById('title-input')

    function countCaracteres(){
        const showCaracteres = document.getElementById('countCaracteres')
        const caracteres = title.length
        showCaracteres.textContent = caracteres

        if (caracteres > 120){
            tituloArea.classList.add('bg-red-200')
        } else if(caracteres === 120){
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
        const showPalavras = document.getElementById('countPalavras')
        const palavras = title.split(/\s+/) 
        const numeroPalavras = palavras.filter(palavra =>{ //Cria um array novo apenas com palavras length > 0 
            return palavra.length > 0;
        }).length;

        showPalavras.textContent = numeroPalavras
    }

    function countLines() {
        if (document.getElementById('title-input').value.length === 0){
            document.getElementById('countLines').textContent = 0
        }else{
            const showLines = document.getElementById('countLines')
            const lines = title.split(/\r?\n/)
            const numeroLinhas = lines.length
            //showLines.textContent = numeroLinhas
            showLines.textContent = numeroLinhas;
        }
    }

    countCaracteres()
    countWords()
    countLines()
}

