from flask import Blueprint, request, jsonify, make_response
from api.models import User
from api.extensions import db, bcrypt, jwt
from api.error_handling import user_errors
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity

users_bp = Blueprint('users', __name__)

user_errors(users_bp)

@users_bp.route('/register', methods = ['POST'])
def register():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(data['password'].encode('utf-8'))

    new_user = User(username=data['username'], email=data['email'], password=hashed_password)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        'message': 'User registered successfulyy!'
    }), 201

@users_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))

        response = make_response(jsonify({
            'access_token': access_token
        }), 200)

        response.set_cookie(
            'refresh_token',
            refresh_token,
            httponly=True,
            secure=True,
            samesite='None',
            path='/'
        )

        print("Setting cookie with values:")
        print("Refresh token:", refresh_token)
        print("Response headers:", response.headers)

        return response
    
    return jsonify({
        'message': 'Invalid Credentials'
    }), 401

@users_bp.route('google/login', methods=['POST'])
def google_login():
    pass

@users_bp.route('/reset-request', methods=['POST'])
def reset_request():
    pass

@users_bp.route('/reset-password', methods=['POST'])
def reset_password():
    pass

@users_bp.route('/refresh', methods=['GET'])
@jwt_required(refresh=True)
def refresh():
    # Debug prints
    print("Entering refresh endpoint")
    print("Headers received:", request.headers)
    print("Cookies received:", request.cookies)
    print("Refresh token:", request.cookies.get('refresh_token'))

    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify({
        'access_token': new_access_token
    }), 200