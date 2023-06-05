#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Deleting all records...")
        # Recipe.query.delete()
        User.query.delete()

        fake = Faker()

        print("Creating users...")

        # make sure users have unique usernames
        users = []
        usernames = []

        for i in range(20):
            
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = User(
                username=username,
                bio=fake.paragraph(nb_sentences=3),
                image_url=fake.url(),
            )

            user.password_hash = user.username + 'password'

            users.append(user)

        db.session.add_all(users)
        db.session.commit()
        print("Complete.")