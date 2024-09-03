function textFormat() {
    const getinput = document.getElementById('text-input').value;
    const textBeforeFormat = getinput.split('\n');
    let textAfterFormat = '';
    const output = document.getElementById('output');
    const outputHTML = document.getElementById('outputHTML')

    const topicsSubtitle = 'acompanha:'
    const importante = '<br><p style="font-weight: bold">Importante:</p><p>A instalação deve ser feita por um profissional especializado.</p><p>Nós não nos responsabilizamos por instalação mal realizada.</p><p>As imagens são meramente ilustradas, pode ocorrer mudança sem prévio aviso, porém as características técnicas são sempre preservadas.</p>';

    if (getinput === ''){
        textAfterFormat += '<p>O Campo de entrada está vazio. Por favor, insira um valor.</p>';
        output.innerHTML = textAfterFormat;
        outputHTML.innerHTML = textAfterFormat;
    } else{
        for (let index = 0; index < textBeforeFormat.length; index++){
            const useLine = textBeforeFormat[index].trim()
            const words = textBeforeFormat[index].split(' '); // Divide a string em palavras
            const lastWord = words[words.length - 1]; // Pega a última palavra
    
            // Verifica se a linha é um título
            if (useLine === ''){
                    const useindex = index + 1
                    textAfterFormat += `<br> <strong><h2 style="font-size: 14pt">${textBeforeFormat[useindex]}</h2></strong>`;
                    index = useindex
            }
    
            // Verifica se é a primeira linha
            else if (index === 0) { 
                textAfterFormat += `<strong><h1 style="font-size: 14pt">${textBeforeFormat[index]}</h1></strong>`;
            } 
    
            // Verifica se é um subtítulo
            else if (lastWord === topicsSubtitle) {
                textAfterFormat += `<p style="font-size: 12pt">${textBeforeFormat[index]}</p>`;
            } 
    
            // Resto do texto
            else{
                textAfterFormat += `<p style="font-size: 12pt">- ${textBeforeFormat[index]}</p>`;
            }
        };

        textAfterFormat += importante;
        output.className = 'w-full shadow-md rounded-xl h-auto bg-white mt-2 p-3 mb-10'
        outputHTML.className = 'w-full shadow-md rounded-xl h-auto bg-white mt-2 p-3 mb-10'
        output.innerHTML = textAfterFormat;
        outputHTML.textContent = textAfterFormat;
    }

}

function buttonCopyText() {
    const output = document.getElementById('output');
    const getinput = document.getElementById('text-input').value;

    if (getinput === ''){
        if (document.getElementById('imgText')){
            document.getElementById('imgText').remove()
        } else{
            document.getElementById('imgTextConfirm').remove()
        }
    } else{
        function createButton(){
            imgText.src = '../assets/clipboard-text-white.svg' //Copy Text
            hoverimg.src = '../assets/clipboard-text.svg'
            imgText.alt = 'copyadd'
            imgText.style = 'width: 20px'
            hoverimg.style = 'width: 20px'
            spancopy.id = 'status'
            imgText.id = 'imgcopy'
            divcopy.id = 'imgText'
            spancopy.textContent = 'Copiar'
            spancopy.className = 'font-semibold text-sm'
            divcopy.className = 'transition hover:scale-110 hover:-translate-y-2 group flex items-center space-x-1 bg-gray-800 rounded-xl p-1 text-white h-6 hover:text-gray-800 hover:bg-amber-100 hover:shadow-xl'
            imgText.className = 'object-cover group-hover:hidden'
            hoverimg.className = 'hidden w-0 object-cover group-hover:block'
            divcopy.appendChild(spancopy)
            divcopy.appendChild(imgText)
            divcopy.appendChild(hoverimg)
            title.appendChild(divcopy)
        }

        const title = document.getElementById('title')
        const imgText = document.createElement('img')
        const divcopy = document.createElement('div')
        const spancopy = document.createElement('span')
        const hoverimg = document.createElement('img')
    
        //TEXT Only
        if (document.getElementById('imgText')){ //Don't repeat
            return
        }else {
            createButton()
        }
    
        //Click icon
        divcopy.addEventListener('click', () => {
            if (document.getElementById('imgText')){
                imgText.src = '../assets/clipboard-confirm-white.svg';
                divcopy.id = 'imgTextConfirm'
                spancopy.textContent = 'Copiado'
                hoverimg.src = '../assets/clipboard-confirm.svg'
                const clipboardItem = new ClipboardItem({
                    "text/html": new Blob([output.innerHTML], { type: "text/html" }),
                    "text/plain": new Blob([output.innerHTML], { type: "text/plain" })
                });
                navigator.clipboard.write([clipboardItem])
            } else{
                createButton()
            }
        });
    
        //Return Icon
        if (document.getElementById('imgTextConfirm')){ //Start copy again
            document.getElementById('imgTextConfirm').remove()
            createButton()
        }
    }
}

function buttonCopyHTML (){
    const outputHTML = document.getElementById('outputHTML')
    const getinput = document.getElementById('text-input').value;

    if (getinput === ''){
        if (document.getElementById('imgHTML')){
            document.getElementById('imgHTML').remove()
        } else{
            document.getElementById('imgHTMLConfirm').remove()
        }
    } else{
        function createButtonHTML(){
            imgHTML.src = '../assets/clipboard-text-white.svg' //Copy Text
            hoverimgHTML.src = '../assets/clipboard-text.svg'
            imgHTML.alt = 'copyadd'
            imgHTML.style = 'width: 20px'
            hoverimgHTML.style = 'width: 20px'
            spancopyHTML.id = 'status'
            imgHTML.id = 'imgcopyHTML'
            divcopyHTML.id = 'imgHTML'
            spancopyHTML.textContent = 'Copiar'
            spancopyHTML.className = 'font-semibold text-sm'
            divcopyHTML.className = 'transition hover:scale-110 hover:-translate-y-1 group flex items-center space-x-1 bg-gray-800 rounded-xl p-1 text-white h-6 hover:text-gray-800 hover:bg-amber-100 hover:shadow-xl'
            imgHTML.className = 'object-cover group-hover:hidden'
            hoverimgHTML.className = 'hidden w-0 object-cover group-hover:block'
            divcopyHTML.appendChild(spancopyHTML)
            divcopyHTML.appendChild(imgHTML)
            divcopyHTML.appendChild(hoverimgHTML)
            titleHTML.appendChild(divcopyHTML)
        }

        const titleHTML = document.getElementById('titleHTML')
        const imgHTML = document.createElement('img')
        const divcopyHTML = document.createElement('div')
        const spancopyHTML = document.createElement('span')
        const hoverimgHTML = document.createElement('img')
    
        //HTML Only
        if (document.getElementById('imgHTML')){ //Don't repeat
            return
        }else {
            createButtonHTML()
        }
    
        //Click icon
        divcopyHTML.addEventListener('click', () => {
            if (document.getElementById('imgHTML')){
                imgHTML.src = '../assets/clipboard-confirm-white.svg';
                divcopyHTML.id = 'imgHTMLConfirm'
                spancopyHTML.textContent = 'Copiado'
                hoverimgHTML.src = '../assets/clipboard-confirm.svg'
                navigator.clipboard.writeText(outputHTML.textContent)
            } else{
                createButtonHTML()
            }
        });
    
        //Return Icon
        if (document.getElementById('imgHTMLConfirm')){ //Start copy again
            document.getElementById('imgHTMLConfirm').remove()
            createButtonHTML()
        }
    }
}
    

document.getElementById('text-input').addEventListener('input', textFormat);
document.getElementById('text-input').addEventListener('input', buttonCopyText);
document.getElementById('text-input').addEventListener('input', buttonCopyHTML);

