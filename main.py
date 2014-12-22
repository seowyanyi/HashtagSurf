from flask import Flask
from flask import url_for
from flask import render_template
from flask import request

app = Flask(__name__)
app.debug = True

@app.route("/")
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run()