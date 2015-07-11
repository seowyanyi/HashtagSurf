from flask import Flask
from flask import url_for
from flask import render_template
from flask import jsonify
from werkzeug.contrib.fixers import ProxyFix
import requests

app = Flask(__name__)
app.debug = True

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search/<query>')
def searchTags(query):
    endpoint = 'https://api.instagram.com/v1/tags/' + query + '/media/recent'
    clientid = open('secret.txt').read();
    payload = {'count': 10, 'client_id':clientid}
    r = requests.get(endpoint, params=payload)
    return jsonify(r.json())


app.wsgi_app = ProxyFix(app.wsgi_app)

if __name__ == "__main__":
    app.run()