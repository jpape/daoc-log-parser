from flask import Flask, request, render_template, Response
from flask_cors import CORS
import json
import combat_parser
import pve_parser
import craft_parser

app = Flask(__name__, static_url_path='', static_folder='dist')
CORS(app)

ALLOWED_EXTENSIONS = set(['txt', 'log'])

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/test', methods=['GET'])
def test_endpoint():
    return render_template('test.html')


@app.route('/upload', methods=['POST'])
def capture_upload():
    if 'logfile' not in request.files:
        return 'Missing logfile'
    file = request.files['logfile']
    if file.filename == '' or not allowed_file(file.filename):
        return 'No selected file or incorrect file type'
    else:
        return Response(handle_uploaded_file(file), mimetype='application/json')


def handle_uploaded_file(upload):
    error_messages = []
    result = {}
    result['Combat'] = combat_parser.parse_uploaded_file(upload, error_messages)
    result['Crafting'] = craft_parser.parse_crafting(upload, error_messages)
    result['PvE'] = pve_parser.parse_pve(upload, error_messages)

    result['Messages'] = error_messages
    j_result = json.dumps(result)

    return j_result


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

if __name__ == '__main__':
    app.run(debug=True)
    