function textFormat() {
    const getinput = document.getElementById('text-input').value;
    const textBeforeFormat = getinput.split('\n');
    let textAfterFormat = '';
    const output = document.getElementById('output');

    const topicsSubtitle = 'acompanha:'
    const importante = '<br><p style="font-weight: bold">Importante:</p><p>A instalação deve ser feita por um profissional especializado.</p><p>Nós não nos responsabilizamos por instalação mal realizada.</p><p>As imagens são meramente ilustradas, pode ocorrer mudança sem prévio aviso, porém as características técnicas são sempre preservadas.</p>';

    for (let index = 0; index < textBeforeFormat.length; index++){
        const useLine = textBeforeFormat[index].trim()
        const words = textBeforeFormat[index].split(' '); // Divide a string em palavras
        const lastWord = words[words.length - 1]; // Pega a última palavra

        // Verifica se a linha é um título
        if (useLine === ''){
                const useindex = index + 1
                textAfterFormat += `<br> <h2 style="font-size: 14pt">${textBeforeFormat[useindex]}</h2>`;
                index = useindex
        }

        // Verifica se é a primeira linha
        else if (index === 0) { 
            textAfterFormat += `<h1 style="font-size: 14pt">${textBeforeFormat[index]}</h1>`;
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
    output.innerHTML = textAfterFormat;

}

document.getElementById('text-input').addEventListener('input', textFormat);
