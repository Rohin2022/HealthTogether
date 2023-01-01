import cohere
from flask import app, request, jsonify
from cohere.classify import Example
from flask import Flask
from Summarization import getData
import pickle

app = Flask(__name__)

co = cohere.Client('esFWCGd2medRhW8UrMMzBgH56wL9QuFqDblqA7Ep')


@app.route('/toxicity')
def toxicity():
    inputStr = request.args.get("input")
    response = co.classify(
        model='ecdb964e-60da-4d8a-b875-6a9f703a7b78-ft',
        inputs=[inputStr])
    response = jsonify({'isToxic': response[0].prediction == "Toxic"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/info")
def info():
    inputStr = request.args.get("input")
    summary = getData(inputStr)
    response = jsonify({'summary': summary})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/recommendations")
def drugRecommendations():
    with open("Mapping.pkl","rb") as f:
        mapping = pickle.load(f)
        inputStr = request.args.get("input")
        recommendations = mapping[inputStr.lower()]
        response = jsonify({'recommendations': recommendations[0:5]})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


if __name__ == "__main__":
    app.run(port=5000)

