Chest

This is an organization app, which focuses on fast input, so you would tag
posessions fast and efficiently. Quick dumps of items are saved for later review.

Later, when you go back and review, you could add meta data like tags and text
descriptions. Again the whole focus is quick and efficient data entry which would
be a photo and location minimum.

# Initializing server env

    $ mkcert -cert-file cert.pem -key-file key.pem localhost 127.0.0.1
    $ python manage.py loaddata <fixturename>

    $ dokku nginx:set chest-api client-max-body-size 50m

# Starting Server Locally

    $ source venv/bin/activate
    $ python migrate
    $ python manage.py runserver_plus --cert-file cert.pem --key-file key.pem

    $ docker-compose up -d
    $ docker-compose logs

# Get Postgres command line

    $ docker exec -it chest_postgres1 psql -U postgres

# Initial server setup

    postgres=# create database chest;
    postgres=# create user chestuser with password 'mypassword';
    postgres=# grant all privileges on database chest to chestUser;
    postgres=# \q
