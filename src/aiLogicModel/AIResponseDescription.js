import dotenv from 'dotenv';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

dotenv.config()

export async function getDescriptionAI(content) {

  let loader;
  loader = new TextLoader("src/aiLogicModel/tools/createDesc.txt");
  const docs = await loader.load()

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    temperature: 0.7,
    maxRetries: 2,
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const template = ChatPromptTemplate.fromTemplate(docs[0].pageContent)

  const outputParser = new StringOutputParser()

  const chain = template.pipe(model).pipe(outputParser);

  const finalResponse = await chain.invoke({
    content: content,
  });

  const finalResponse2 = finalResponse.split('\n').slice(1, -1).join('\n');

  console.log(finalResponse2)
}

const object = await getDescriptionAI(`Forno e Fritadeira Sem Óleo Oster 42L French Door 2 em 1
5 funções pré-programadas
FUNÇÃO FRITAR SEM ÓLEO
FUNÇÃO CONVECÇÃO
CAPACIDADE DE 42 LITROS
VARIAÇÃO DE TEMPERATURA
fundo curvo ANTIDERRAPANTES
Controle de temperatura ajustável de 90ºC a 230ºC
EXCLUSIVO French Door
Modelo	TSSTTVFDMAF-017 
Tensão	127V 
Potência	1700W
Consumo	1,7 kW/h
Dimensões [LxAxP]	550x325x490mm
Garantia (meses)	12
Peso	9,65Kg
Código de barras	0053891162586
Inclui bandeja, grelha e cesto para auxiliar em todos os preparos. Além da bandeja coletora de gordura, que trás praticidade para a limpeza.`)