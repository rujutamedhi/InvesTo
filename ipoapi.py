import finnhub
finnhub_client = finnhub.Client(api_key="cvakvj9r01qsapm9tmggcvakvj9r01qsapm9tmh0")

print(finnhub_client.ipo_calendar(_from="2020-05-01", to="2020-06-01"))