#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Room, Booking

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Deleting all records...")
        User.query.delete()
        Room.query.delete()

        fake = Faker()

        print("Creating users...")

        # make sure users have unique usernames
        users = []
        usernames = []
        emails =[]

        for i in range(20):
            
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            email = fake.email()
            while email in emails:
                email = fake.email()
            emails.append(email)

            user = User(
                username=username,
                email = email,
                _password_hash = fake.password()
            )

            user.password_hash = user.username + 'password'
            users.append(user)
        db.session.add_all(users)

        print("Creating rooms...")

        rooms =[]
        for i in range(20):
            sleeps = randint(1,6)
            special_view = rc(["Ocean", "City", "None"])
            if sleeps == 1 or sleeps == 2:
                if special_view == "None":
                    price = randint(50,60)
                else:
                    price = randint(70,80)
                image_url = "https://www.toptreehouses.com/wp-content/uploads/2022/08/treehouse-indonesia.jpeg"
                queen_beds = 1
                couch_pullout_beds= 0
            if sleeps == 3 or sleeps == 4:
                if special_view == "None":
                    price = randint(110,120)
                else:
                    price = randint(130,140)
                image_url = "https://www.efteling.com/en/-/media/images/nieuw-overnachten/hotel/accommodaties-nieuw/comfortkamers-4p/1024x576-efteling-hotel-4-persoons-comfortkamer-overzicht.jpg"
                queen_beds = 2
                couch_pullout_beds= 0
            if sleeps == 5 or sleeps == 6:
                if special_view == "None":
                    price = randint(190,200)
                else:
                    price = randint(210,220) 

                image_url = "https://pintsizepilot.com/wp-content/uploads/San-Carlos-Hotel.png"
                queen_beds = 2
                couch_pullout_beds = 1

            room = Room(
                price_per_night = price,
                room_number = randint(1,300),
                sleeps = sleeps,
                special_view = special_view,
                image_url = image_url,
                queen_beds = queen_beds,
                couch_pullout_beds = couch_pullout_beds
            )
            # if room.sleeps == 1 or 2:
            #     room.image_url = "https://www.toptreehouses.com/wp-content/uploads/2022/08/treehouse-indonesia.jpeg"
            #     room.queen_beds = 1
            #     room.couch_pullout_beds= 0
            # if room.sleeps == 3 or 4:
            #     room.image_url = "https://www.efteling.com/en/-/media/images/nieuw-overnachten/hotel/accommodaties-nieuw/comfortkamers-4p/1024x576-efteling-hotel-4-persoons-comfortkamer-overzicht.jpg"
            #     room.queen_beds = 2
            #     room.couch_pullout_beds= 0
            # if room.sleeps == 5 or 6:
            #     room.image_url = "https://pintsizepilot.com/wp-content/uploads/San-Carlos-Hotel.png"
            #     room.queen_beds = 2
            #     room.couch_pullout_beds = 1
            
            rooms.append(room)

        db.session.add_all(rooms)
        
        db.session.commit()
        print("Complete.")