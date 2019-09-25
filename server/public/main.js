(function() {
    const URL_BASE = "http://localhost:8000";
    let EMOJI_TABLE = null;
    window.addEventListener('load', init);

    function init() {
        document.getElementById('input').addEventListener('input', update);
        fetch(URL_BASE + '/emojitable')
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
            output += word + " ";
            console.log(EMOJI_TABLE);
            if (EMOJI_TABLE[word]) {
                output += EMOJI_TABLE[word] + " ";
            }
        }
        document.getElementById('output').innerText = output;
    }
}());