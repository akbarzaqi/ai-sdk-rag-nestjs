import { Injectable } from '@nestjs/common';
import {
  convertToModelMessages,
  ModelMessage,
  streamText,
  UIMessage,
} from 'ai';
import { Response } from 'express';
import { ToolsService } from './tools.service';

@Injectable()
export class ChatService {
  constructor(private readonly toolsService: ToolsService) {}

  async chat(messages: UIMessage[], model: string, response: Response) {
    const modelMessages: ModelMessage[] = [
      { role: 'system', content: this.getSystemPrompt() },
      ...convertToModelMessages(messages),
    ];

    const result = streamText({
      model,
      messages: modelMessages,
      tools: this.toolsService.getAllTools(),
    });
    return result.pipeUIMessageStreamToResponse(response);
  }

  private getSystemPrompt() {
    return 'You are a generic chat bot that can answer any questions, but also use the tools that we define to answer the user';
  }
}
