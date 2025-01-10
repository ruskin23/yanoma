import os
from flask import Flask
from api.extensions import db, bcrypt, jwt
from flask_cors import CORS
from api.error_handling import general_errors, authentication_errors

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', '')
    app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']
    app.config['JWT_REFRESH_COOKIE_NAME'] = 'refresh_token'

    
    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Register error handlers
    general_errors(app)
    authentication_errors(jwt)

    # Register blueprints
    from api.routes.users import users_bp
    from api.routes.notes import notes_bp
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(notes_bp, url_prefix='/api/notes')

    with app.app_context():
        db.create_all()
    
    return app
