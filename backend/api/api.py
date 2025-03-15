from flask import Flask, jsonify
from flask_cors import CORS
import finnhub

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Initialize Finnhub client
finnhub_client = finnhub.Client(api_key="cvakvj9r01qsapm9tmggcvakvj9r01qsapm9tmh0")

@app.route('/stock/<symbol>', methods=['GET'])
def get_stock(symbol):
    try:
        stock_data = finnhub_client.quote(symbol)  # Get stock prices
        company_data = finnhub_client.company_profile2(symbol=symbol)  # Get company info

        if "name" not in company_data:
            return jsonify({"error": "Stock not found"}), 404

        return jsonify({
            "name": company_data.get("name", "Unknown"),
            "symbol": symbol,
            "price": stock_data["c"],
            "high": stock_data["h"],
            "low": stock_data["l"],
            "change": stock_data["d"]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
STOCK_SYMBOLS = ["AAPL", "GOOGL", "TSLA", "AMZN", "MSFT"]
@app.route('/stockdetails/<symbol>', methods=['GET'])
def get_stock_details(symbol):
    try:
        quote = finnhub_client.quote(symbol)  # Fetch stock price details
        profile = finnhub_client.company_profile2(symbol=symbol)  # Fetch company details

        stock_info = {
            "symbol": symbol,
            "name": profile.get("name", "N/A"),
            "current_price": quote.get("c", 0),
            "high": quote.get("h", 0),
            "low": quote.get("l", 0),
            "change": quote.get("dp", 0),
            "market_cap": profile.get("marketCapitalization", "N/A"),
            "prev_close": quote.get("pc", 0),
            "exchange": profile.get("exchange", "N/A"),
            "pe_ratio": profile.get("pe", "N/A"),
            "dividend_yield": profile.get("dividendYield", "N/A"),
            "eps": profile.get("eps", "N/A"),
        }
        print(stock_info)
        return jsonify(stock_info)
    
    except Exception as e:
        return jsonify({"error": f"Error fetching data for {symbol}: {str(e)}"}), 500

@app.route('/stocks', methods=['GET'])
def get_all_stocks():
    stock_list = []
    for symbol in STOCK_SYMBOLS:
        try:
            stock_data = finnhub_client.quote(symbol)
            company_data = finnhub_client.company_profile2(symbol=symbol)

            stock_list.append({
                "name": company_data.get("name", symbol),
                "symbol": symbol,
                "price": stock_data.get("c", "N/A"),
                "high": stock_data.get("h", "N/A"),
                "low": stock_data.get("l", "N/A"),
                "change": stock_data.get("d", "N/A")
            })
        except Exception as e:
            print(f"Error fetching data for {symbol}: {e}")

    return jsonify(stock_list)
if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Start Flask on port 5000
