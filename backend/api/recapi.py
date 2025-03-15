import finnhub
finnhub_client = finnhub.Client(api_key="cvakvj9r01qsapm9tmggcvakvj9r01qsapm9tmh0")

print(finnhub_client.recommendation_trends('META'))