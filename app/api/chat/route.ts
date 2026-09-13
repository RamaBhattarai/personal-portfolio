import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an assistant embedded in a frontend developer's portfolio website.
Answer visitor questions about the developer's skills and background based only on this bio:

- 1-2 years of professional experience with React and TypeScript.
- Builds animated, motion-driven interfaces using GSAP and Framer Motion.
- Comfortable with REST API integration, responsive design, and Git.
- Currently growing skills in Three.js and scroll-driven storytelling.

Keep answers short (2-4 sentences), friendly, and focused on frontend/motion work.
If asked something unrelated to the developer or this site, politely redirect.`;

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is not configured with an API key." },
      { status: 500 }
    );
  }

  const anthropic = new Anthropic({ apiKey });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: message }],
  });

  const text = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n");

  return NextResponse.json({ reply: text });
}
