from flask import Blueprint, request, jsonify
from api.models import Collections, Note
from api.extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity

notes_bp = Blueprint('notes', __name__)

@notes_bp.route('/get/collections', methods=['GET'])
@jwt_required()
def get_collections():
    """Get all notes of the user"""
    user_id = get_jwt_identity()
    collections = Collections.query\
        .filter_by(user_id=user_id)\
        .order_by(Collections.created_at.desc())\
        .all()

    return jsonify([
        {
            'id': collection.id, 
            'heading': collection.heading,
            'created_at': collection.created_at,
            'notes': [{
                'id': note.id,
                'title': note.title,
                'description': note.description
            } for note in collection.notes]
            } 
        for collection in collections
        ]), 200

@notes_bp.route("/get/collection/<int:collection_id>/notes", methods=['GET'])
@jwt_required()
def get_collection_notes(collection_id):
    """Get all notes for a specific collection"""
    user_id = get_jwt_identity()
    
    collection = Collections.query\
        .filter_by(user_id=user_id, id=collection_id)\
        .first()
    
    if not collection:
        return jsonify({
            'message': 'Collection not found'
        }), 404

    return jsonify([
        {
            'id': note.id,
            'title': note.title,
            'description': note.description
        } for note in collection.notes
    ]), 200

@notes_bp.route("/add/collection", methods=['POST'])
@jwt_required()
def add_collection():
    """Add a new note for the user"""
    user_id = get_jwt_identity()
    data = request.json
    
    new_collection = Collections(
        user_id=user_id, 
        heading=data['heading']
        )
    
    db.session.add(new_collection)
    db.session.commit()
    return jsonify({
        'message': 'Successfully added collection',
        'collection': {
            'id': new_collection.id,
            'heading': new_collection.heading,
            'notes': []
        }
    }), 200

@notes_bp.route("/add/note/<int:collection_id>", methods=['POST'])
@jwt_required()
def add_note(collection_id):
    """Add a new note for the user"""
    user_id = get_jwt_identity()
    data = request.json
    
    #Verify Colleciton exist
    collection = Collections.query.filter_by(
        id=collection_id,
        user_id=user_id
        ).first_or_404()
    
    new_note = Note(
        collection_id=collection_id, 
        title=data['title'], 
        description=data['description']
        )
    
    db.session.add(new_note)
    db.session.commit()
    
    return jsonify({
        'message': 'Successfully added note',
        'note': {
            'id': new_note.id,
            'title': new_note.title,
            'description': new_note.description
        }
    }), 200

@notes_bp.route("/update/note/<int:collection_id>/<int:note_id>", methods=['PUT'])
@jwt_required()
def update_note(collection_id, note_id):
    """Update an existing note within a specific colleciton"""
    user_id = get_jwt_identity()
    data = request.json
    print(f"data: {data}")
    collection  = Collections.query.filter_by(
        id=collection_id,
        user_id=user_id
        ).first_or_404()
    
    print(f"Received COllection with id, {collection.id}")
    
    note = Note.query.filter_by(
        id=note_id,
        collection_id=collection_id
    ).first_or_404()
    print(f"Received Note with id, {note.id}")

    note.title = data.get('title', note.title)
    note.description = data.get('description', note.description)
    
    db.session.commit()
    
    return jsonify({
        'message': 'Successfully updated note',
        'note': {
            'id': note.id,
            'title': note.title,
            'description': note.description
        }
    }), 200
    
@notes_bp.route("/delete/collection/<int:collection_id>", methods=['DELETE'])
@jwt_required()
def delete_collection(collection_id):
    """Delete a collection and all its associated notes"""
    user_id = get_jwt_identity()
    
    collection = Collections.query.filter_by(
        id=collection_id,
        user_id=user_id
    ).first_or_404()
    
    db.session.delete(collection)
    db.session.commit()
    
    return jsonify({
        'message': 'Successfully deleted collection',
        'id': collection_id
    }), 200

@notes_bp.route("/delete/note/<int:collection_id>/<int:note_id>", methods=['DELETE'])
@jwt_required()
def delete_note(collection_id, note_id):
    """Delete a specific note from a collection"""
    user_id = get_jwt_identity()
    
    # Verify collection belongs to user
    collection = Collections.query.filter_by(
        id=collection_id,
        user_id=user_id
    ).first_or_404()
    
    # Find and delete the note
    note = Note.query.filter_by(
        id=note_id,
        collection_id=collection_id
    ).first_or_404()
    
    db.session.delete(note)
    db.session.commit()
    
    return jsonify({
        'message': 'Successfully deleted note',
        'id': note_id
    }), 200