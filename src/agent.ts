import { Agent, tool } from '@strands-agents/sdk'
import z from 'zod'

// Define a custom tool - counts letter occurrences in a word
const letterCounter = tool({
  name: 'letter_counter',
  description: 'Count occurrences of a specific letter in a word. Case-insensitive.',
  inputSchema: z.object({
    word: z.string().describe('The word to search in'),
    letter: z.string().length(1).describe('The letter to count'),
  }),
  callback: ({ word, letter }) => {
    const count = word.toLowerCase().split(letter.toLowerCase()).length - 1
    return `The letter '${letter}' appears ${count} time(s) in '${word}'`
  },
})

// Create an agent with the custom tool
// Uses Amazon Bedrock with Claude 4 by default
const agent = new Agent({
  tools: [letterCounter],
})

// Test the agent
const result = await agent.invoke('How many letter R\'s are in the word "strawberry"? 🍓')
console.log(result.lastMessage)
