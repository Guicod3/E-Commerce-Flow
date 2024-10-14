import dotenv from 'dotenv';
dotenv.config({ path: '../../variablesEnviroment/.env' })
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from 'zod'
import { StructuredOutputParser } from 'langchain/output_parsers';

export async function getTitlesAnunciosAI(content, numberTitles) {
  
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    temperature: 1,
    maxRetries: 2,
    apiKey: process.env.GOOGLE_API_KEY,
  });

  // Configurando o template de prompt corretamente
  const template = ChatPromptTemplate.fromTemplate(`
Persona: Marketing and SEO Specialist who makes titles using as many words as possible to get close or pass a little to the 60-character limit and that for questions or inputs outside of the context you always use the response for invalid content 'Sou um agente criador de títulos, não posso te ajudar com isso.'

Objective: Create optimized ad titles for products on marketplaces, adhering to SEO and marketing rules.

Task:
Generate titles for the provided content, in the requested quantity.
These titles will be used to promote products on marketplace platforms.

Guidelines:
Title Structure (order doesn't need to be followed):
Type of product (e.g., Kit, Pair, Speaker, Grill, etc.)
Brand
Model
Key features (e.g., power, size, non-stick, etc.)
Voltage (if applicable)

<important>Select the product features and insert them according to the following pattern:
Type of product brand model feature 1 feature 2 feature 3... You can mix these structures to create different titles, sometimes adding different features, sometimes omitting the model name, or something similar.
Examples:
- Type of product brand model feature 1 feature 2 feature 3
- brand model feature 1 feature 2 feature 3 Type of product
- model brand feature 1 feature 2 Type of product feature 3
- brand Type of product feature 1 model feature 2 feature 3
</important>

Formatting Requirements:
Maximum of 60 characters.
Avoid special characters, such as commas, hyphens, or symbols.
Different titles for each suggestion (avoid unnecessary word repetition).

Invalid Content:
Text without a connection to products.
Text with incorrectly formed words.
Text containing offensive or inappropriate language.
Important Note:

Ensure each title is unique and follows the proposed structure.
Provided Content: {content}
Number of Titles: {numberTitles}
Formatting Instructions: {format_instructions}
Response for Invalid Content: {resposta}

Language for the response: Portuguese
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
    resposta: 'Sou um agente criador de títulos, não posso te ajudar com isso.'
  });

}
