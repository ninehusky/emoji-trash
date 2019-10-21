# encoding=utf8
# sql_editor.py is a file that I made because I didn't want to use some sort of web interface
# and adding emojis and words into this database is a real pain in the butt if you were to
# manually type SQL queries for every single relationship.
# The overall design of this file feels so off and I can't even articulate why. If you are smart
# and see how I could improve this without breaking my spine in multiple places please let me know.

# TODO: not have sucky documentation

import sqlite3, sys

EMOJI_LIST = "😀😃😄😁😆😌☺️😂😅😇🙂🙃😉😌😙😝😘🥰😍😚😋😛😜😜😎🤓🧐🧐🤪🤪🤩🥳😏😒😞☹️🙁😕😟😔😔😣😖😖😩🥺😡😡😤😭😢🤬🤯😳🥵🥶😓😥😨😱🤗🤔🤭🤥🤥🙄😑😐😶😯😧😧😲😲🤐😵😪🤤😴🥴🤢🤮🤧😷😈😈🤑🤕👿👹🤡💩🐣🐤🐦🐤🐧🐔🦆🐤🤞🏻😪🤤🤒🤮🤧😷💩🤡🤕👿👹👺🤡💩👾👽☠️👻🤖🎃😺😹😻😻😽🙀😿👏🏻👏🏻👐🏻🤲🏻🤝👎🏻👊🏻🤟🏼🤞🏻🤛🏻🤛🏻👌🏻👈🏻👉🏻👆🏻🤚🏻✋🏻👇🏻🖖🏻👋🏻🤙🏻💪🏻🖕🏻💄🦵✍🏻✍🏻👃🏻🗣👵🏼👵🏼👤👣👄🦷👥👴🏻👀💄👂🏻👧🏻👱🏻‍♀️💂🏻‍♀️👩🏻‍🍳🧕🏿👨🏻‍💻👮🏻‍♀️👨🏼‍💼👨🏿‍🎓👩🏻‍🌾👩🏻‍🏫💂🏻‍♀️👩🏻‍🍳👨🏿‍🎓👮🏽‍♂️👮🏻‍♂️👩🏻‍🏭👩🏻‍🏭👩🏻‍🔬🤶🏻🧜🏿‍♀️🧜🏿‍♀️🦸🏽‍♂️🎅🏼🦸🏽‍♂️💁🏻‍♂️🦸🏽‍♂️🧞‍♂️🤶🏻🧞‍♀️🦸🏽‍♂️🧞‍♀️🧙‍♂️👼🏼💃🏼💏👨‍❤️‍💋‍👨👪👩‍👩‍👦👩‍❤️‍💋‍👩👨‍❤️‍👨👨‍👩‍👧👨‍👩‍👦‍👦👨‍👩‍👧‍👧👩‍👩‍👦👩‍👩‍👧‍👧👩‍👩‍👧‍👦👨‍👨‍👧👨‍👨‍👧‍👦👨‍👨‍👦‍👦👩‍👦👩‍👦👨‍👨‍👦‍👦👯‍♀️👨‍👨‍👧👩‍👩‍👦‍👦👨‍👨‍👦👩‍👦👨‍👨‍👧‍👦👩‍👧‍👦👨‍👨‍👧‍👧👨‍👧‍👧👨‍👧‍👦🧵🥼👚👙👖🥿👡👞🧤🥾👟🥿👚👨‍👧‍👧🕶🧳💼🧳🥽🐱🐹🐹🐰🐼🦊🐼🐸🙉🦁🐼🙊🙉🐵🐦🐤🦆🐥🐌🐝🐗🦟🕸🦂🕷🐢🕸🦕🦎🐢🦞🦀🦐🐡🐟🐳🐡🐠🐬🐆🦈🦈🐆🦏🦓🦍🦛🐃🦘🐪🦒🐃🐏🐎🐂🐑🐐🐕🦚🦃🐓🐈🦜🦢🕊🐇🦝🦔🐿🐁🦡🐾🐲🎄🌿🌿🌴🌳☘️🍀🎋🍃🌾🌾🐚🍁🍂💐🌹🥀🌺🌝🌞🌻🌸🌛🌜🌚🌖🌖🌓🌒🌘🌗🌔🌍🌏⚡️✨⭐️💫☄️🔥🌪🌈☁️🌥🌤🌦🌧🌩🌨💨🌬☃️❄️💧☔️☂️🌊🌫🍋🍊🍎🍏🍉🍇🍈🥥🥥🥭🍒🥝🍆🥑🥦🥕🌽🌶🥬🍠🍠🥯🍞🍳🥚🧀🥖🥖🍖🍗🥓🦴🥙🍟🍕🥗🌯🥙🥘🍝🍜🍲🍤🥟🍣🍙🍚🍘🍥🥠🍨🍡🥮🍦🧁🍰🎂🍿🍫🍬🍮🍩🌰🍯🍯🥤🍵🍼🥛🍺🍻🍷🍷🥄🍾🍸🥃🍽🥢🥢🍽🧂🥎⚾️🏈⚽️🎾🏉🥏🎱🏑🏒🏓🏏🥅⛳️🏹🎣🛷🛹🎽🥋🥊⛸🥌🎿⛷🏂🤸🏻‍♀️🤸🏻‍♀️🤼‍♀️🏋🏿‍♂️🧘‍♀️🏌️‍♀️🧗🏻‍♀️🚣🏻‍♂️🚣🏻‍♀️🚣🏻‍♀️🤽🏻‍♂️🤽🏼‍♀️🧘🏻‍♂️🏄🏻‍♀️🏄🏻‍♂️🏊🏼‍♀️🏊🏼‍♂️🚣🏻‍♂️🏊🏼‍♂️🏄🏻‍♂️🤽🏼‍♀️🤽🏻‍♂️🧗🏻‍♀️🎖🥈🥉🎟🎗🎪🎬🎧🎼🎹🎻🎺🎲🎮🎮🎯🎲🎰🧩🚗🚙🚌🚐🚒🚓🚚🚜🛴🚍🚔🚨🚘🚖🚠🚟🚇🚞🚅🚈🚆🛬🛫🚉🛩🛩🛰🚀🛸🛥🚤⛵️🛶🚁🛳🚢⚓️⛽️🗺🚏🚥🚧🗿🗽🗼🏰🏯⛲️🎢🎡⛱🏝🏜🌋🏗🏕🗻🏔🏡🏘🏚🏗🏤🏣🏬🏭🏦🏨🏪🏫🕌⛪️💒🏩🕋⛩🛤🛣🛤🌄🌅🏞🗾🌠🎇🌇🌆🌁🌉🌌🌃⌚️📲⌨️⌨️🕹🖲🖱🖨🖥🗜💾💿📀♒️♒️🎥📹💽🗜📽🎞☎️📟🎚🎙📻📺🎛⏱⏲⏰🔋🔋📡⌛️🔌🔌🔦🕯🧯💶💴💸💷💰💳⚖️🛠⚒🔨🧰⛏🔩⚙️🧱⛓🔪🧨💣🔫🧲🗡🛡🚬⚰️🧿🧿🔮🏺💈⚗️🔭🔬🧫🦠💉💊🧪🌡🧺🛁🛁🚰🚽🧽🧴🛎🛌🛏🛋🚪🗝🧸🛍🛒🎁🎉🎊🎏🎈🎎🎐🧧✉️📊📑📄📈🗒🗓📆🗂📇📅🗄📁📂🗂📒📓📰📕📗📙📚📎🔗🔖📖🖇📐🧮📌✒️🖊📍🖌📝🔍🔓🔒🔏🔎❤️💛💙💙💕🧡🧡💜🖤💕💘💖💓💝☮️✝️☪️🕎🔯☸️🕎🔯🕉☯️☯️⛎♈️♍️♌️♉️♌️♑️♏️♓️♏️⚛️☢️🈚️🆚📴🈺🈸📳🈶🈚️🅰️🈹💮㊗️🈴🆑🆎🛑🆘💢💢❕📵🚯🛑📛📵🚯❓❕〽️〽️🔅♻️🔱⚜️🔰♻️❇️🈯️✅❎🌐💠🌀🅿️🚾🈂️🛃🛃🛅🛅🈳🚹🔣ℹ️🔡🔠🆖🆓🆓🆒🆗2️⃣7️⃣🔟️⃣3️⃣0️⃣🔤6️⃣#️⃣3️⃣2️⃣🔢⏸🆒🔤5️⃣7️⃣⏪⏮⏬↗️↗️⏪⏯◀️⬆️↙️↕️➡️⏹⏸6️⃣️⃣⤴️⤴️↪️🎶🎵✖️®️💱💲🔚🔛©️💲🔚💲➖©️🔝✔️➰🔜☑️⚫️🔴🔹🔻🔵🔶🔳▪️▪️◻️🔲🔷🔶◾️◼️◻️🔉🔈🔊🔊🔕📢♣️♠️💭♥️🎴🀄️🕔🎴♥️🕐🕓🕔🕙🕘🕖🕕🕚🕜🕞🕣🕡🕟🕤🕦🕧🏳️🏴🏴‍☠️🏁🚩🇦🇱🇦🇫🏳️‍🌈🇩🇿🇦🇸🇦🇴🇦🇮🇦🇼🇦🇲🇦🇬🇦🇶🇦🇺🇦🇿🇧🇸🇧🇭🇧🇿🇧🇪🇧🇧🇧🇯🇧🇲🇧🇴🇧🇦🇧🇳🇮🇴🇧🇼🇨🇽🇰🇭🇮🇨🇨🇴🇩🇴🇨🇬🇮🇨🇨🇦🇧🇶🇨🇺🇨🇼🇨🇬🇨🇻🇨🇴🇩🇰🇪🇷🇩🇰🇧🇶🇩🇰🇪🇷🇹🇩🇨🇳🇨🇿🇩🇯🇪🇷🇨🇳🇮🇨🇨🇩🇪🇨🇨🇴🇪🇨🇨🇳🇨🇼🇬🇫🇬🇲🇬🇼🇮🇩🇬🇾🇮🇪🇬🇭🇬🇳🇮🇸🇯🇵🇰🇿🇬🇩🇭🇹🇮🇪🇬🇮🇬🇬🇮🇳🇯🇲🇬🇵🇬🇬🇬🇮🇮🇪🇰🇿🇰🇿🇭🇹🇮🇶🇰🇿🇬🇩🇬🇭🇬🇪🇯🇲🇬🇺🇭🇰🇮🇷🇬🇭🇲🇻🇱🇷🇲🇰🇱🇾🇰🇼🇲🇶🇲🇱🇲🇦🇲🇪🇲🇺🇱🇷🇱🇾🇽🇰🇱🇾🇲🇱🇲🇼🇲🇺🇲🇦🇳🇦🇲🇨🇱🇺🇱🇸🇲🇱🇲🇨🇲🇸🇲🇺🏛🏩🇲🇩🇲🇻🇲🇼🇲🇰🇳🇵🇳🇺🇵🇪🇵🇬🇳🇵🇳🇫🇵🇦🇶🇦🇵🇹🇸🇲🇵🇦🇳🇪🇰🇵🇳🇦🇵🇼🇵🇹🇸🇳🇵🇰🇳🇫🇳🇬🇷🇪🇸🇱🇵🇱🇴🇲🇳🇨🇰🇵🇵🇦🇸🇲🇰🇵🇳🇬🇼🇸🇳🇫🇵🇦🇼🇸🇵🇰🇳🇪🇸🇲🇵🇱🇳🇬🇵🇼🇸🇦🇵🇱🇸🇩🇿🇦🇵🇲🇸🇷🇹🇻🇨🇭🏴󠁧󠁢󠁥󠁮󠁧󠁿🇹🇬🇦🇪🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁥󠁮󠁧󠁿🇬🇧🇬🇧🇬🇧🇸🇾🇵🇲🇸🇩🇹🇹🇸🇭🇱🇨🇰🇷🇹🇴🇸🇩🇼🇸🇸🇱🇸🇰🇸🇮🇼🇸🇸🇬🇸🇱🇸🇭🇶🇦🇸🇮🇨🇭🇷🇼🇸🇮🇻🇨🇸🇪🇹🇨🏴󠁧󠁢󠁥󠁮󠁧󠁿🇻🇪🇻🇪🇺🇿🇬🇧🇪🇭🇻🇳🇺🇸🇻🇪🇪🇭🇿🇲🇿🇼"
PROFANITY_DEBUG_VALUE = 0
ABSURDITY_DEBUG_VALUE = 1

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

def edit_table(cursor):
    choice = -1
    while choice not in range(1, 3):
        print("Would you like to import words, emojis, or both?")
        print("\t1. Words")
        print("\t2. Emojis")
        print("\t3. Both")
        choice = int(input(">"))
    if choice == 1:
        for emoji in EMOJI_LIST:
            word = ''
            profane = ' '
            absurdity = ' '
            while len(word) == 0:
                word = input("Give me a word that represents {}: (EXIT to end)".format(emoji))
                if word == 'EXIT':
                    print('exiting...')
                    return
            add_into_table(cursor, word, emoji, PROFANITY_DEBUG_VALUE, ABSURDITY_DEBUG_VALUE)

def add_into_table(cursor, word, emoji, profane, absurdity):
    """Adds the given word/emoji pair into the database."""
    params = (word, emoji, profane, absurdity)
    cursor.execute('''INSERT INTO emojis (word, emoji, profane, absurdity)
                        VALUES (?, ?, ?, ?)''', params)
    

def display_table(cursor):
    cursor.execute('''SELECT * FROM emojis''')

def turn_on_profanity(cursor):
    pass

if __name__ == '__main__':
    print("This script is used to edit the emojipasta database.")
    print("Connecting to database...")
    try:
        conn = sqlite3.connect('emoji_database.db')
        cursor = conn.cursor()
    except:
        print("There was an error connecting to the database.")
        sys.exit()

    print("Connected!")
    choice = -1    
    while choice not in range(1, 5):
        print("Would you like to:")
        print("\t1. Create table")
        print("\t2. Delete table")
        print("\t3. Edit table")
        print("\t4. Exit")
        choice = int(input(">"))
    if choice == 1:
        create_table(cursor)
        conn.commit()
    elif choice == 2:
        delete_table(cursor)
        conn.commit()
    elif choice == 3:
        edit_table(cursor)
        conn.commit()
    conn.close()
    sys.exit()
    

