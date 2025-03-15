import requests

def get_bonds():
    response = requests.get(f"https://api.twelvedata.com/bonds?apikey=d1b4c902740849cebfe6d9a88b253800")
    return response