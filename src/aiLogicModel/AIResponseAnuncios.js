import dotenv from 'dotenv';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from 'zod'
import { StructuredOutputParser } from 'langchain/output_parsers';
dotenv.config()

export async function getTitlesAnunciosAI(content, numberTitles) {

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    temperature: 1,
    maxRetries: 2,
    apiKey: process.env.GOOGLE_API_KEY,
  });

  // Configurando o template de prompt corretamente
  const template = ChatPromptTemplate.fromTemplate(`
    Persona: Especialista em Marketing e SEO.

    Objetivo: Criar títulos de anúncios otimizados para produtos em marketplaces, respeitando as regras de SEO e marketing.

    Tarefa:

    - Gerar títulos para o conteúdo fornecido, na quantidade solicitada.
    - Esses títulos serão usados para promover produtos em plataformas de marketplace.
    
    Diretrizes:

    1 - Estrutura do Título (Não precisa seguir a mesma ordem):
    - Tipo do produto (ex: Kit, Par, Alto-Falante, Grill, etc.)
    - Marca
    - Modelo
    - Características principais (ex: potência, tamanho, antiaderente...)
    - Voltagem (se aplicável)

    2 - Exigências de Formatação:
    - Máximo de 60 caracteres.
    - Evitar caracteres especiais, como vírgulas, traços, ou símbolos.
    - Títulos diferentes para cada sugestão (não repita palavras desnecessariamente).
    - Use o maior número de palavras possível para se aproximar do limite de 60 caracteres.

    3 - Exemplos de Títulos:
    - Kit 2 Vias Bomber 6 Polegadas 120 Rms Universal 240w Pico
    - Kit 2 Vias 6 Polegadas 120 Rms Bomber Universal Par Falantes
    - Par Alto Falantes 6x9 Jbl 220w Rms 69qdfx110 Full Range
    - Kit Alto Falante 5 Pol Bomber 120w Rms Bbr5 240w Pico Par
    - Par De Alto Falantes Flex 4 69qdfx110 Jbl 220w 6x9 Pol

    4 - Conteúdos inválidos: 
    - texto sem conexão com produtos
    - texto sem palavras formadas corretamente
    - texto com xingamentos ou conteúdos ofensivos

    Nota Importante:
    - Certifique-se de que cada título seja exclusivo e siga a estrutura proposta.

    Conteúdo fornecido: {content}
    Quantidade de títulos: {numberTitles}
    Instruções de formatação: {format_instructions}
    Resposta para conteúdo considerados inválidos: {resposta}
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
    resposta: 'Sou um agente criado de títulos, não posso te ajudar com isso.'
  });
}

