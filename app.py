from flask import Flask, request, render_template
from flask_cors import CORS
import log_parser

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
        return log_parser.parse_uploaded_file(file)


def handle_uploaded_file(upload):
    return log_parser.parse_uploaded_file(upload)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

if __name__ == '__main__':
    app.run(debug=True)
    