import sys, json

def add_emojis():
    COMMON_WORDS = ["the","of","and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","I","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"]
    data = None
    with open('tempdata.json', 'r') as write_file:
        data = json.load(write_file)        
    
    with open('tempdata.json', 'w+') as write_file:
        for word in COMMON_WORDS:
            emoji = input('Give me an emoji that represents {} (Enter to skip): '.format(word))
            if emoji:
                data[word] = emoji
        json.dump(data, write_file)

def read_json():
    with open('tempdata.json', 'r') as read_file:
        data = json.load(read_file)
        print(data)


if __name__ == '__main__':
    print('Welcome!')
    choice = ''
    while choice != 'w' or choice != 'e' or choice != 'x':
        choice = input('Enter W for adding words, E for adding emojis, B for both, or X to exit: ').lower()
        if choice == 'w':
            read_json()
        elif choice == 'e':
            add_emojis()
        elif choice == 'b':
            pass
        elif choice == 'x':
            sys.exit()
