import finnhub
finnhub_client = finnhub.Client(api_key="cvakvj9r01qsapm9tmggcvakvj9r01qsapm9tmh0")

APPL= finnhub_client.quote('AAPL')
# APPL.keys()

new_keys = {
    'c': 'current_price',
    'd' : 'change',
    'dp': 'change_percentage',
    'h': 'high_price',
    'l': 'low_price',
    'o': 'open_price',
    'pc': 'previous_close',

}

APPL_renamed = {new_keys.get(k, k): v for k, v in APPL.items()}
APPL_delete = ['t']
for key in APPL_delete:
    del APPL_renamed[key]

    

print(APPL_renamed)

# print(finnhub_client.quote('AAPL'))