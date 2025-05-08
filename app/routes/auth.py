import uuid
from flask import Blueprint, render_template, request, jsonify
from flask_login import login_user, logout_user, login_required
from flask_bcrypt import check_password_hash  # Correct import
from app.app import db, bcrypt
from app.models import Organization, User

auth_bp = Blueprint('auth', __name__, template_folder="templates")

# Super Admin Signup
@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    organization_name = data.get('organization_name')

    # Check if the organization already exists
    existing_org = Organization.query.filter_by(organization_name=organization_name).first()

    if not existing_org:
        # Create a new organization
        new_org = Organization(
            organization_id=str(uuid.uuid4()),  
            organization_name=organization_name,
            contact_email=data.get('email'),  
            contact_phone=data.get('phone_number'),
            address='',  
            city='',
            state='',
            country=''
        )
        db.session.add(new_org)
        db.session.commit()
    else:
        new_org = existing_org  # Use existing organization

        # Check if a Super Admin already exists for this organization
        existing_superadmin = User.query.filter_by(organization_id=new_org.organization_id, role='Super Admin').first()
        if existing_superadmin:
            return jsonify({'message': 'A Super Admin already exists for this organization'}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'message': 'User already exists'}), 400

    # Hash password
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    # Create new user and assign to organization
    new_user = User(
        full_name=data['full_name'],
        username=data['username'],
        email=data['email'],
        phone_number=data['phone_number'],
        organization_id=new_org.organization_id,  # Link user to organization
        password_hash=hashed_password,
        role='Super Admin'  # Ensuring this user is a Super Admin
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Super Admin registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401

    # Check if password is correct
    if not check_password_hash(user.password_hash, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401

    # Check if user is inactive or suspended
    if user.status in ['Inactive', 'Suspended']:
        return jsonify({'message': f'Your account is {user.status}. Please contact support.'}), 403

    # Log in user if all checks pass
    login_user(user)
    return jsonify({'message': 'Login successful'}), 200

@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200
