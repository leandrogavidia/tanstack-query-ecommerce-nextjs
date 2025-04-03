import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai"

import { fetchAllProducts } from "@/lib/api";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

if (!OPENAI_API_KEY || !BASE_URL) {
    throw new Error("Missing environment variables, check the .env.example file");
}

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json()

        const allProducts = await fetchAllProducts();

        const result = streamText({
          model: openai("gpt-4o-mini"),
          system: `Eres un asistente virtual de NextStore, una tienda online de ropa, calzado y accesorios.
          
          Información sobre la tienda:
          - Entrega en 24/48h en península
          - Devoluciones gratuitas en un plazo de 30 días
          - Métodos de pago: tarjeta de crédito, PayPal, transferencia bancaria
          - Atención al cliente: lunes a viernes de 9:00 a 18:00
          
          Responde de manera amable y profesional. Si no sabes la respuesta a alguna pregunta específica sobre un producto, pide al usuario que contacte con atención al cliente.
          
          Mantén tus respuestas breves y concisas.
          
          El siguiente archivo JSON te da toda la información de los productos disponibles en la tienda: 

          ${JSON.stringify(allProducts)}

          Siempre reemplaza el simbolo € a $ sin cambiar el valor de price.

          Añadele el enlace directo a cada producto, la ruta sería ${BASE_URL}/productos/<product-id>
          `,
          maxTokens: 1024,
          temperature: 0.7,
          topP: 1,
          frequencyPenalty: 0,
          presencePenalty: 0,
          messages: convertToCoreMessages(messages),
        })
      
        return result.toDataStreamResponse()
    } catch (e) {
        console.error(e)
    }

}

