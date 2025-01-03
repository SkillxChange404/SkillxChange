from flask import Flask, request, jsonify
from typing import List
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from marshmallow import ValidationError
from datetime import datetime
import mysql.connector
from mysql.connector import Error


class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class = Base)


#=== MODELS====

user_skills = db.Table(
    'user_skills',
    db.metadata,
    db.Column('user_id', db.ForeignKey('users.id')),
    db.Column('skill_id', db.ForeignKey('skills.id'))
)


db_name = "skill_change"
user = 'root'
password = 'Auston123!'
host = "127.0.0.1"
try:
    conn = mysql.connector.connect(
        database = db_name,
        user = user,
        password = password,
        host = host 
    )
    
    if conn.is_connected():
        print("Connected")
        
except Error as e:
    print("Error: {e}")
    
class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    # username: Mapped[str] = mapped_column(db.String(50), nullable=False)
    firstname: Mapped[str] = mapped_column(db.String(50), nullable=False)
    lastname: Mapped[str] = mapped_column(db.String(50), nullable=False)
    email: Mapped[str] = mapped_column(db.String(100), nullable=False, unique=True)
    password_hash: Mapped[str] = mapped_column(db.String(100), nullable=False)
    rating: Mapped[float] = mapped_column(db.Float, default=0)
    created_at: Mapped[datetime] = mapped_column(db.DateTime, default=datetime.utcnow)

    transactions: Mapped[List['Transaction']] = db.Relationship(back_populates='requester')
    skills: Mapped[List['Skill']] = db.Relationship(secondary=user_skills, back_populates='users')
    listings: Mapped[List['Listing']] = db.Relationship(back_populates='user')
    reviews_given: Mapped[List['Review']] = db.Relationship(foreign_keys='Review.reviewer_id', back_populates='reviewer')
    reviews_received: Mapped[List['Review']] = db.Relationship(foreign_keys='Review.reviewee_id', back_populates='reviewee')


    
class Skill(Base):
    __tablename__ = 'skills'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(db.String(100), nullable=False)
    description: Mapped[str] = mapped_column(db.String(250), nullable=True)

# many-to-many with users
    users: Mapped[List['User']] = db.Relationship(secondary=user_skills, back_populates='skills')

    
    
class Listing(Base):
    __tablename__ = 'listings'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(db.ForeignKey('users.id'))
    skill_id: Mapped[int] = mapped_column(db.ForeignKey('skills.id'))
    title: Mapped[str] = mapped_column(db.String(255), nullable=False)
    description: Mapped[str] = mapped_column(db.String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(db.DateTime, default=datetime.utcnow)

    user: Mapped['User'] = db.Relationship(back_populates='listings')
    transactions: Mapped[List['Transaction']] = db.Relationship(back_populates='listing')


    
class Transaction(Base):
    __tablename__ = 'transactions'

    id: Mapped[int] = mapped_column(primary_key=True)
    listing_id: Mapped[int] = mapped_column(db.ForeignKey('listings.id'))
    requester_id: Mapped[int] = mapped_column(db.ForeignKey('users.id'))
    status: Mapped[str] = mapped_column(db.Enum('pending', 'completed', 'cancelled'), default='pending')
    created_at: Mapped[datetime] = mapped_column(db.DateTime, default=datetime.utcnow)
    completed_at: Mapped[datetime] = mapped_column(db.DateTime, nullable=True)

    listing: Mapped['Listing'] = db.Relationship(back_populates='transactions')
    requester: Mapped['User'] = db.Relationship(back_populates='transactions')

    
    
class Review(Base):
    __tablename__ = 'reviews'

    id: Mapped[int] = mapped_column(primary_key=True)
    reviewer_id: Mapped[int] = mapped_column(db.ForeignKey('users.id'))
    reviewee_id: Mapped[int] = mapped_column(db.ForeignKey('users.id'))
    transaction_id: Mapped[int] = mapped_column(db.ForeignKey('transactions.id'))
    rating: Mapped[int] = mapped_column(nullable=False)
    comment: Mapped[str] = mapped_column(db.String(300), nullable=True)
    created_at: Mapped[datetime] = mapped_column(db.DateTime, default=datetime.utcnow)

    reviewer: Mapped['User'] = db.Relationship(foreign_keys=[reviewer_id], back_populates='reviews_given')
    reviewee: Mapped['User'] = db.Relationship(foreign_keys=[reviewee_id], back_populates='reviews_received')
    
class Exchange(Base):
    __tablename__ = 'exchanges'

    id: Mapped[int] = mapped_column(primary_key=True)
    listing_id: Mapped[int] = mapped_column(db.ForeignKey('listings.id'))
    user_id: Mapped[int] = mapped_column(db.ForeignKey('users.id'))
    skill_id: Mapped[int] = mapped_column(db.ForeignKey('skills.id'))
    description: Mapped[str] = mapped_column(db.String(255))
    status: Mapped[str] = mapped_column(db.String(50), nullable=False)
    created_at: Mapped[datetime] = mapped_column(db.DateTime, default=datetime.utcnow)

    listing: Mapped['Listing'] = db.Relationship()
    user: Mapped['User'] = db.Relationship()
    skill: Mapped['Skill'] = db.Relationship()
