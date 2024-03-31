import { Injectable, Logger } from '@nestjs/common';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import OpenAI from 'openai';

@Injectable()
export class RoadmapService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async *processStreamedJsonArray<T>(
    stream: AsyncIterable<any>,
  ): AsyncGenerator<T, void, unknown> {
    let accumulator = ''; // Accumulate JSON object characters
    let depth = 0; // Depth of nested JSON structures
    let isInString = false; // Whether the current context is within a string

    for await (const part of stream) {
      const chunk = part.choices[0]?.delta?.content; // Extract content from the stream part

      if (chunk) {
        for (const char of chunk) {
          // Toggle isInString when encountering a quote that isn't escaped
          if (char === '"' && (accumulator.slice(-1) !== '\\' || isInString)) {
            isInString = !isInString;
          }

          // Accumulate characters if within an object or string
          if (isInString || depth > 0) {
            accumulator += char;
          }

          // Adjust depth based on the current character if not within a string
          if (!isInString) {
            if (char === '{') {
              depth++; // Increase depth at the start of an object
              if (depth === 1) {
                accumulator = '{'; // Ensure accumulator starts with an opening brace for a new object
              }
            } else if (char === '}') {
              depth--; // Decrease depth at the end of an object
            }
          }

          // Attempt to parse when depth returns to 0, indicating the end of an object
          if (depth === 0 && !isInString && accumulator.trim() !== '') {
            try {
              const parsedObject = JSON.parse(accumulator); // Parse the accumulated string as JSON
              yield parsedObject; // Yield the parsed JSON object
            } catch (e) {
              console.error('Error parsing JSON:', e); // Log parsing errors
            }
            accumulator = ''; // Reset accumulator for the next JSON object
          }
        }
      }
    }
  }

  async create(userPrompt: string, callback: (data: any) => void) {
    const stream = await this.openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [
        {
          role: 'system',
          content: `
          You are a professional roadmap assistant who helps create visual learning paths. 
          The response should be strictly array JSON formatted. For example consider following JSON array representing a basic roadmap for frontend developer:
          [
            {
              "title": "Internet",
              "details": [
                "How does the internet work?",
                "What is HTTP?",
                "What is Domain Name?",
                "How does DNS work?"
              ]
            },
            {
              "title": "HTML",
              "details": [
                "Learn the basics",
                "Writing semantic HTML",
                "Forms and validations",
                "Accessibility",
                "SEO Basics"
              ]
            },
            {
              "title": "CSS",
              "details": [
                "Learn the basics",
                "Flexbox",
                "Grid",
                "Responsive design",
                "CSS Variables",
                "Preprocessors"
              ]
            },
            {
              "title": "JavaScript",
              "details": ["Learn the basics", "DOM Manipulation", "AJAX"]
            },
            {
              "title": "Version Control Systems",
              "details": ["Git", "Github"]
            },
            {
              "title": "Package managers",
              "details": ["npm", "yarn", "pnpm", "bun"]
            },
            {
              "title": "Pick a framework",
              "details": ["React", "Vue.js", "Angular"]
            },
            {
              "title": "Writing CSS",
              "details": ["Tailwind", "Radix UI", "Shadcn UI"]
            },
            {
              "title": "Build tools",
              "details": ["Webpack", "Rollup", "Parcel"]
            },
            {
              "title": "CSS Architecture",
              "details": ["BEM", "OOCSS", "SMACSS"]
            },
            {
              "title": "Testing",
              "details": ["Jest", "Mocha", "Cypress"]
            },
            {
              "title": "Type Checking",
              "details": ["TypeScript"]
            },
            {
              "title": "Server Side Rendering",
              "details": ["Next.js", "Nuxt.js"]
            },
            {
              "title": "GraphQL",
              "details": ["Apollo", "Relay"]
            },
            {
              "title": "State Management",
              "details": ["Redux", "MobX", "Vuex"]
            },
            {
              "title": "Web Components",
              "details": ["Custom Elements", "Shadow DOM"]
            },
            {
              "title": "Static Site Generators",
              "details": ["Gatsby", "Jekyll", "Hugo"]
            },
            {
              "title": "Web Assembly",
              "details": ["Rust", "AssemblyScript"]
            },
            {
              "title": "WebRTC",
              "details": ["Peer to Peer Communication"]
            },
            {
              "title": "Web Sockets",
              "details": ["Realtime Communication"]
            },
            {
              "title": "Web Workers",
              "details": ["Multithreading in JavaScript"]
            },
            {
              "title": "Web Performance",
              "details": ["Lazy Loading", "Code Splitting", "Tree Shaking"]
            }
          ]
          The user will ask you for desired prompt and you will provide the roadmap elements in JSON array format. Create not more than 10 nodes. Do not include more than 5 details in each node.
          `,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      stream: true,
    });
    try {
      for await (const jsonObject of this.processStreamedJsonArray(stream)) {
        if (jsonObject) callback(jsonObject);
      }
    } catch (error) {
      Logger.error('Error processing OpenAI stream', error);
      throw new Error('Failed to process OpenAI stream');
    }
  }

  findAll() {
    return `This action returns all roadmap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roadmap`;
  }

  update(id: number, updateRoadmapDto: UpdateRoadmapDto) {
    return `This action updates a #${id} roadmap`;
  }

  remove(id: number) {
    return `This action removes a #${id} roadmap`;
  }
}
