import dotenv from 'dotenv';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { z } from 'zod'
import { StructuredOutputParser } from 'langchain/output_parsers';
dotenv.config()

export async function getTitlesAnunciosAI(content, numberTitles, type) {
  let loader;
  if (type === "titulo") {
    loader = new TextLoader("src/aiLogicModel/tools/createTitle.txt");
  } else if (type === "descricao") {
    loader = new TextLoader("src/aiLogicModel/tools/createDesc.txt");
  }

  const docs = await loader.load()

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    temperature: 0.7,
    maxRetries: 2,
    apiKey: process.env.GOOGLE_API_KEY,
  });

    const outputParser = StructuredOutputParser.fromZodSchema(
      z.object({
        titles: z.array(z.string()).describe('Títulos')
      })
    )
  //const chain = loader.pipe(model).pipe(outputParser);

  return await model.invoke({
    context: docs,
    content: content,
    numberTitles: numberTitles,
    format_instructions: outputParser.getFormatInstructions(),
  });
}

const teste = await getTitlesAnunciosAI(`Grill Elétrica Elgin Break Time 800W 2 Em 1 Antiaderente Luz Indicadora Trava Fechamento
Grill Duplo Antiaderente
Duplo sistema de aquecimento, 1 para cada placa
Revestimento antiaderente
Trava de fechamento
Superfície tocável
Base antiderrapante
Proteção contra superaquecimento`, 3, 'titulo')

console.log(test)