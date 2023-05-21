from flask import Flask, render_template
import json

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

a = 'hello'
@app.route("/test/")
def test():
    return render_template("test.html", a = json.dumps([1, 2, 5]))

if(__name__ == "__main__"):
    app.run()