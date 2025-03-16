import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

def generate(budget, risk):
    client = genai.Client(
        api_key=os.environ.get("GEMINI_API_KEY"),
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

    Based on the user's budget and risk profile, suggest 3-5 stocks. Categorize them as:
    - *Safe:* (low volatility)
    - *Balanced:* (moderate risk-reward)
    - *High-Risk:* (growth/momentum)
    
    Provide reasoning for each recommendation. *Return the response strictly in JSON format* as follows:
    json
    [
        {{"name": "Stock A", "category": "Safe", "reason": "Low volatility, stable returns"}},
        {{"name": "Stock B", "category": "Balanced", "reason": "Moderate risk-reward balance"}},
        {{"name": "Stock C", "category": "High-Risk", "reason": "High growth potential but volatile"}}
    ]
    
    Ensure the response is *valid JSON only* without additional text."""
                )
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

    response_text = ""  # Initialize response storage

    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        response_text += chunk.text  # Append each chunk

    try:
        json_response = json.loads(response_text)  # Convert to JSON
        return json_response
    except json.JSONDecodeError:
        return {"error": "Invalid response format from Gemini", "raw_response": response_text}

if _name_ == "_main_":
    print(generate(2000, "medium"))