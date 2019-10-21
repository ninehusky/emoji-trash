(function() {
    const URL_BASE = "http://localhost:8000";
    let EMOJI_TABLE = null;
    window.addEventListener('load', init);

    function init() {
        document.getElementById('input').addEventListener('input', update);
        fetch(URL_BASE + '/gettable')
            .then(data => data.json())
            .then(data => {
                EMOJI_TABLE = data;
            })
            .catch(console.error);
    }

    function update() {
        let words = document.getElementById('input').value.split(' ');
        let output = "";
        for (let index in words) {
            let word = words[index];
            output += word + findEmoji(word) + " ";
            // console.log(EMOJI_TABLE);
        }
        document.getElementById('output').innerText = output;
    }

    function findEmoji(word) {
        for (let index in EMOJI_TABLE) {
            let wordObj = EMOJI_TABLE[index]; // we could also just use a regular for loop here lmao
            if (wordObj['word'] == word) {
                return wordObj['emoji'];
            }
        }
        return '';
    }
}());