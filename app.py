from flask import Flask, request, render_template
from flask_cors import CORS
import os
import alt_parse

app = Flask(__name__, static_url_path='', static_folder='dist')
# app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = set(['txt', 'log'])

@app.route('/')
def index():
    return app.send_static_file('index.html')
    # return render_template('index.html')

@app.route('/test', methods=['GET', 'POST'])
def test_endpoint():
    return alt_parse.parse_test_file()

@app.route('/upload', methods=['POST'])
def capture_upload():
    if request.method == 'POST':
        if 'logfile' not in request.files:
            return 'Missing logfile'
    file = request.files['logfile']
    if file.filename == '' or not allowed_file(file.filename):
        return 'No selected file or incorrect file type'
    else:
        return alt_parse.parse_uploaded_file(file)


def handle_uploaded_file(upload):
    return alt_parse.parse_uploaded_file(upload)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

if __name__ == '__main__':
    # port = int(os.environ.get("PORT", 5000))
    # app.run(debug=True, host='0.0.0.0', port=port)
    app.run(debug=True)
    