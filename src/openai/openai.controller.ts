import { Controller, Post, Body } from '@nestjs/common';

@Controller('openai')
export class OpenaiController {
  @Post()
  async create(@Body() prompt) {
    try {
      const resp = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          input: [
            {
              role: "system",
              content: [
                {
                  type: "input_text",
                  text: "You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative."
                }
              ]
            },
            {
              role: "user",
              content: [
                {
                  type: "input_text",
                  text: prompt.text
                }
              ]
            }
          ],
          temperature: 0.5,
          max_output_tokens: 60
        })
      });

      if (resp.ok) {
        const result = await resp.json();
        return result;
      } else {
        const err = await resp.json();
        console.error(err);
        return '';
      }
    } catch (error) {
      console.error(error.message);
      return '';
    }
  }
}
