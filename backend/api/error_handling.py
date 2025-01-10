from flask import jsonify
from sqlalchemy.exc import IntegrityError
from api.extensions import db

def authentication_errors(jwt):
    @jwt.unauthorized_loader
    def unauthorized_response(error):
        return jsonify({
            'error': 'Authorization required', 
            'message': error
            }), 401

    @jwt.invalid_token_loader
    def invalid_token_response(error):
        return jsonify({
            'error': 'Invalid token', 
            'message': error
            }), 422

    @jwt.expired_token_loader
    def expired_token_response(header, payload):
        return jsonify({
            'error': 'Token expired', 
            'message': 'Please refresh your token'
            }), 401


def general_errors(app):
    @app.errorhandler(Exception)
    def handle_general_exception(error):
        return jsonify({
            'message': 'An unexpected error occurred',
            'status': 'error'
        }), 500

def user_errors(users_bp):
    @users_bp.errorhandler(IntegrityError)
    def handle_unique_user(error):
        db.session.rollback()
        
        return jsonify({
            'message': 'User already exists',
        }), 400
