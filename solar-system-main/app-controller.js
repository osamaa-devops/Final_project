console.log('We are inside app-controller.js');

function handleRequestError(message) {
    console.error('Error:', message);
    alert(message);
}

/* on page load  */
window.onload = function() {
    const planet_id = document.getElementById("planetID").value
    console.log("onLoad - Request Planet ID - " + planet_id)

    fetch("/os", {
            method: "GET"
        })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Failed to fetch pod information');
        }).catch(function(error) {
            console.log('Error fetching pod info:', error);
            return null;
        })
        .then(function(data) {
            if (!data) {
                document.getElementById('hostname').innerHTML = `Connected to: Solar System Pod (local)`;
                return;
            }
            document.getElementById('hostname').innerHTML = `Pod: ${data.os} (${data.env || 'production'})`;
        });
};

const btn = document.getElementById('submit');
if (btn) {
    btn.addEventListener('click', func);
}

function func() {
    const planet_id = document.getElementById("planetID").value;
    
    if (!planet_id || planet_id < 1 || planet_id > 8) {
        handleRequestError('Please enter a number between 1 and 8');
        return;
    }
    
    console.log("onClick Submit - Request Planet ID - " + planet_id)

    fetch("/planet", {
            method: "POST",
            body: JSON.stringify({
                id: planet_id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(function(res2) {
            if (res2.ok) {
                return res2.json();
            }
            if (res2.status === 404) {
                throw new Error('Planet not found. Please select a number between 1-8');
            }
            throw new Error('Request failed with status ' + res2.status);
        }).catch(function(error) {
            handleRequestError(error.message || 'Failed to fetch planet information');
            console.error('Error:', error);
            return null;
        })
        .then(function(data) {
            if (!data) {
                return;
            }
            document.getElementById('planetName').innerHTML = ` ${data.name} `

            const element = document.getElementById("planetImage");
            const image = ` ${data.image} `
            element.style.backgroundImage  = "url("+image+")"

            const planet_description = ` ${data.description} `
            document.getElementById('planetDescription').innerHTML = planet_description.replace(/(.{80})/g, "$1<br>");
        });

}

