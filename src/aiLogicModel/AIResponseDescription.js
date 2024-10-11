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

const object = await getDescriptionAI(`Ventilador de Parede Falcon 60cm Preto 127/220V

Ideal para grandes espaços.

Lojas, escolas, igrejas, restaurantes, indústrias, ambientes que precisam de grande ventilação.

Hélices 6 pás.

Aerodinâmica que gera mais ventilação.

Grade de aço.

Mais segurança e durabilidade.

Motor 230W.

Motor potente de alta velocidade.

Hélices em plástico de engenharia.

Fortes, leves e aumentam a vida útil do motor.

Oscilação horizontal automática.

Proporciona um fluxo de ar melhor distribuído por todo o ambiente.

Regulagem de inclinação manual podendo ser ajustada.

Selecionar na chave seletora a tensão, 127V ou 220V.

Pintura Eletrostática.

Grade com pintura de alta resistência.

Controle de velocidade em chave para fixação na parede.
`)