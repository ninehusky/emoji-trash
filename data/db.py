import sqlite3
EMOJI_LIST = "😀😃😄😁😆😅😂🤣☺️😌😇🙂🙃😉😌😍😘😗😙😚😋😜😝😛🤑🤗🤓😎🤡🤠😏😒😞😔😟😕🙁☹️😣😖😫😩😤😠😡😶😐😑😯😦😧😮😲😵😳😱😨😰😢😥🤤😭😓😪😴🙄🤔🤥😬🤐🤢🤧😷🤒🤕"

def setup(cur, conn):
    cur.execute("""CREATE TABLE IF NOT EXISTS emojis (
        word CHAR(255),
        emoji CHAR(1)
    )""")
    conn.commit()

def populate(cur, conn):
    for emoji in EMOJI_LIST:
        word = input("Word that represents " + emoji)
        cur.execute("INSERT INTO emojis VALUES (?, ?)", (word, emoji))
    conn.commit()

if __name__ == "__main__":
    conn = sqlite3.connect('emoji_table.db')
    cur = conn.cursor()
    setup(cur, conn)
    populate(cur, conn)
    cur.execute("SELECT * FROM emojis")
    print(cur.fetchall())
