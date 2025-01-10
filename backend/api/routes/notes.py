from flask import Blueprint, request, jsonify
from api.models import Notes
from api.extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity

notes_bp = Blueprint('notes', __name__)

@notes_bp.route('/get', methods=['GET'])
@jwt_required()
def get_notes():
    """Get all notes of the user"""
    user_id = get_jwt_identity()
    notes = Notes.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            'id': note.id, 
            'title': note.title, 
            'content': note.content
            } 
        for note in notes
        ])

@notes_bp.route('/get/int:pk', methods=['GET'])
@jwt_required()
def get_notes():
    """Get a specific notes of the user"""
    user_id = get_jwt_identity()


@notes_bp.route("/add", methods=['POST'])
@jwt_required()
def add_note():
    """Add a new note for the user"""
    user_id = get_jwt_identity()
    data = request.json
    new_note = Notes(title=data['title'], content=data['content'], user_id=user_id)
    db.session.add(new_note)
    db.session.commit()
    return jsonify({
        'message': 'Note created successfully'
    }), 201
    
@notes_bp.route("/update", method=[''])
@jwt_required()
def update_note():
    """Update a note"""
    user_id = get_jwt_identity()
    
@notes_bp.route("/delete", method=[''])
@jwt_required()
def update_note():
    """Delete a note"""
    user_id = get_jwt_identity()

