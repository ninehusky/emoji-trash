(function() {
    window.addEventListener('load', init);

    function init() {
        document.getElementById('input').addEventListener('input', update);
    }

    function update() {
        document.getElementById('output').innerText = document.getElementById('input').value;
    }
}());