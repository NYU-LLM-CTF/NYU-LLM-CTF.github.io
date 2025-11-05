document.addEventListener('DOMContentLoaded', function() {
    loadLeaderboard(leaderboardFile);
});

function loadLeaderboard(json) {
    fetch(json)
        .then(response => response.json())
        .then(data => {
            updateLeaderboardTable(data);
            // updateDatasetSummary(data.dataset);
        })
        .catch(error => console.error('Error loading the leaderboard:', error));
}

// const modelPrettyName = new Map();
// modelPrettyName.set("gpt-4-0125-preview", "GPT 4");
// modelPrettyName.set("gpt-4-1106-preview", "GPT 4");
// modelPrettyName.set("gpt-3.5-turbo-1106", "GPT 3.5");
// modelPrettyName.set("gpt-4o", "GPT 4o");
// modelPrettyName.set("claude-3-haiku-20240307", "Claude 3 Haiku");
// modelPrettyName.set("claude-3.5-sonnet-20240620", "Claude 3.5 Sonnet");
//
// function getModelPretty(model) {
//     if (modelPrettyName.has(model))
//         return modelPrettyName.get(model);
//     return model;
// }

function updateLeaderboardTable(data) {
    const leaderboardLoader = document.querySelector('#leaderboard_loader');
    const leaderboardTableBody = document.querySelector('#leaderboard tbody');

    if (!leaderboardTableBody.classList.contains('is-hidden')) {
        leaderboardTableBody.classList.add('is-hidden');
    }
    if (leaderboardLoader.classList.contains('is-hidden')) {
        leaderboardLoader.classList.remove('is-hidden');
    }


    leaderboardTableBody.innerHTML = ''; // Clear existing rows
    data.submissions.sort((a, b) => {return a.points - b.points;}).reverse();
    data.submissions.forEach((item, index) => {
        const row = document.createElement('tr');

        const num_solved = (item.scoring.solved).toFixed(0);
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name} <i>${item.region}</i></td>
            <td>${item.event}</td>
            <td>${item.points}</td>
            <td>${num_solved}</td>
            <td>${item.date}</td>
        `;
        leaderboardTableBody.appendChild(row);
    });

    leaderboardTableBody.classList.remove('is-hidden');
    leaderboardLoader.classList.add('is-hidden');
}
