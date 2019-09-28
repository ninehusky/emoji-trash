import sqlite3

conn = sqlite3.connect('emoji_database.db')
cursor = conn.cursor()

def create_table(cursor):
    print('Creating table emojis with vals of word, emoji, profane, absurdity')
    cursor.execute('''CREATE TABLE emojis (
        word VARCHAR UNIQUE,
        emoji CHAR(1),
        profane BIT,
        absurdity TINYINT
        )''')

def delete_table(cursor):
    choice = input('ARE YOU SURE YOU WANT TO DELETE?')
    if choice == 'Y':
        cursor.execute('''DROP TABLE emojis''')


create_table(cursor)
print('Done!')