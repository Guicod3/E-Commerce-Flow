import dotenv from 'dotenv';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from 'zod'
import { StructuredOutputParser } from 'langchain/output_parsers';
dotenv.config()

export async function getTitlesAnunciosAI(content, numberTitles){
  let loader;
  loader = new TextLoader("src/aiLogicModel/tools/createTitle.txt");
  const docs = await loader.load()

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    temperature: 0.7,
    maxRetries: 2,
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const template = ChatPromptTemplate.fromTemplate(docs[0].pageContent)

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