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

if __name__ == '__main__':
    choice = ''
    print("This script is used to edit the emojipasta database.")
    while choice not in [str(x + 1) for x in range(4)]:
        print("Would you like to:")
        print("\t1. Create table")
        print("\t2. Delete table")
        print("\t3. Edit table")
        print("\t4. Exit")
        choice = input(">")
    print(choice)
