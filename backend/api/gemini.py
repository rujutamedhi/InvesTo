import base64
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()


def generate(budget, risk):
    client = genai.Client(
        # api_key=os.environ.get("GEMINI_API_KEY"),
        api_key = "AIzaSyBzTDbvM9cHX-skFhedFMGVjjxzwMxwU7Q",
    )

    model = "gemini-2.0-pro-exp-02-05"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=f"""I am building a stock recommendation system that takes user inputs such as budget {budget} and risk ability {risk} to suggest stocks. Analyze stocks based on:

    User Inputs: Investment budget, risk tolerance (low, medium, high), and investment type (growth, value, dividend, momentum).
    Fundamental Analysis: EPS, P/E ratio, ROE, Revenue Growth, Debt-to-Equity, Free Cash Flow.
    Technical Analysis: RSI, MACD, Moving Averages (50-day, 200-day), Bollinger Bands, Trading Volume.
    Market Sentiment: Recent news, social media trends, institutional holdings.
    Based on the users budget and risk profile, suggest 3-5 stocks. Categorize them as safe (low volatility), balanced (moderate risk-reward), and high-risk (growth/momentum). Provide reasoning for each recommendation. dont explain the technical analysis in detail, just mention the indicators used and the conclusion. keep it simmple and concise within 200 words."""),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        temperature=1,
        top_p=0.95,
        top_k=64,
        max_output_tokens=8192,
        response_mime_type="text/plain",
    )

    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        
        config=generate_content_config,
    ):
        
        print(chunk.text, end="")
        response = chunk.text
        # return response.json()
        return chunk.text

if __name__ == "__main__":
    generate(2000,'medium')