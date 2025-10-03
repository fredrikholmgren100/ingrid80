const API_URL = "https://api.sheety.co/19d52e6f83ab4563121d3da380c48d62/bingoPlayers/blad1"; // your URL

document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let color = document.querySelector("input[name='color']:checked").value;

  try {
    // 1. Get all rows
    let res = await fetch(API_URL);
    let data = await res.json();

    // Dynamically get the first key (sheet name)
    let sheetKey = Object.keys(data)[0];
    let rows = data[sheetKey];

    // 2. Check if user exists
    let existing = rows.find(row => row.name === name && row.color === color);

    if (existing) {
      console.log("Welcome back:", existing);
      window.location.href = `play.html?id=${existing.id}`;
    } else {
      // 3. Create new user
      let createRes = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [sheetKey]: {
            name: name,
            color: color,
            data: "{}"
          }
        })
      });

      let newUser = await createRes.json();
      console.log("New user created:", newUser);
      window.location.href = `play.html?id=${newUser[sheetKey].id}`;
    }
  } catch (err) {
    console.error("Error talking to Sheety:", err);
    alert("Something went wrong. Please try again.");
  }
});
