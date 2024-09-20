import dotenv from 'dotenv';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
dotenv.config()

export async function getTitlesAnunciosAI(content, numberTitles){
  
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    temperature: 1,
    maxRetries: 2,
    apiKey: process.env.GOOGLE_API_KEY,
  });
  
  const template = ChatPromptTemplate.fromMessages([
      { role: 'system', content: 'Gere {number} diferentes títulos para o texto fornecido. O título deve conter: "Tipo do item, Marca, Modelo e Características principais (Voltagem se tiver)". Não utilize caracteres especiais como vírgulas, traços ou outros símbolos, apenas palavras.' },
      { role: 'user', content: '{input} o título deve ser pequeno de 45 a 60 caracteres' },
  ]);
  
  const chain = template.pipe(model);
  
  const response = await chain.invoke({
      input: content, 
      number: numberTitles,
  });
  
  
}

