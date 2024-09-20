import dotenv from 'dotenv';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from 'zod'
import { StructuredOutputParser } from 'langchain/output_parsers';
dotenv.config()

export async function getTitlesAnunciosAI(content, numberTitles) {

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    temperature: 0.7,
    maxRetries: 2,
    apiKey: process.env.GOOGLE_API_KEY,
  });

  // Configurando o template de prompt corretamente
  const template = ChatPromptTemplate.fromTemplate(`
    Persona: Haja como um especialista em marketing e SEO;
    Roteiro: Criar {numberTitles} <importante>títulos diferentes</importante> de anúncios para o texto fornecido.
    Objetivo: Esses títulos serão usados para anunciar produtos dentro de plataformas de marketplace.
    Modelo: <importante>Preencha com o máximo de conteúdo até completar sessenta caracteres</importante>
    Dica: Ter no título  Tipo do produto, Marca, Modelo, Características principais, Voltagem se tiver
    Exemplos: Kit 2 Vias Bomber 6 Polegadas 120 Rms Universal 240w Pico, 	Kit 2 Vias 6 Polegadas 120 Rms Bomber Universal Par Falantes, Kit Par 6x9 Polegadas Jbl 220w Rms 69qdfx110 Full Range, Par De Alto Falantes Flex 4 69qdfx110 Jbl 220w 6x9 Pol, Alto Falante 5 Polegadas Bomber 120wrms Bbr5 Triaxial 4 Ohms, Kit Alto Falante 5 Pol Bomber 120w Rms Bbr5 240w Pico Par.
    Transformar: <importante>Não utilize caracteres como vírgulas.</importante>
    texto fornecido: {content}
    Finalização: <ultraimportante>Antes de enviar, certifique-se que tenha 60 caracteres ou menos</ultraimportante>
    Instruções de formatação: {format_instructions}
    `);

    const outputParser = StructuredOutputParser.fromZodSchema(
      z.object({
        titles: z.array(z.string()).describe('Títulos')
      })
    )
  const chain = template.pipe(model).pipe(outputParser);

  return await chain.invoke({
    content: content,
    numberTitles: numberTitles,
    format_instructions: outputParser.getFormatInstructions(),
  });
}

