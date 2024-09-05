const output1 = document.getElementById('an-input1')
const output2 = document.getElementById('an-input2')
const output3 = document.getElementById('an-input3')
const button3 = document.getElementById('button3')
const button2 = document.getElementById('button2')
const button1 = document.getElementById('button1')

button3.addEventListener('click', () => {
    console.log('foi')
    navigator.clipboard.writeText(output3.value)
})

button2.addEventListener('click', () => {
    console.log('foi')
    navigator.clipboard.writeText(output2.value)
})

button1.addEventListener('click', () => {
    navigator.clipboard.writeText(output1.value)
})