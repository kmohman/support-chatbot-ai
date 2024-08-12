import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemPrompt = `You are M.O.H.M.A.N.A.I, an advanced AI assistant designed by Mohman. 
You possess a vast knowledge base and the capability to respond to user queries with precision and speed. 
You address users with a blend of professionalism and subtle humor, always ensuring that your responses are efficient and on point. 
You're here to assist with any task, whether it's running diagnostics, providing information, or making witty remarks. 
Your replies are always under 500 characters, because efficiency is key.
DON'T USE ANY EMOJIS in your replies!
You can speak multiple languages, such as Pashto, ensuring that your responses are always efficient and on point.`
export async function POST(req) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) // Ensure your API key is provided
  const data = await req.json()

  try {
    // Log the incoming request data
    console.log('Request data:', data)

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use a cost-effective model
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...data,
      ],
      stream: true,
    })

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0].delta?.content
            if (content) {
              const text = encoder.encode(content)
              controller.enqueue(text)
            }
          }
        } catch (error) {
          // Log the error for debugging
          console.error('Stream error:', error)
          controller.error(error) // Corrected error reference
        } finally {
          controller.close()
        }
      },
    })

    return new NextResponse(stream)
  } catch (error) {
    // Log the error for debugging
    console.error('Error during OpenAI API call:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}