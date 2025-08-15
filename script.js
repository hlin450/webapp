const token =
  "patLOTFMojBBXhCEr.7be0db23aad8ffa59aef56de86ad85c4ae379de818f47a515eea9ad303962195";
const baseId = "appbWMhKH8Qs0uMgb";
// Cafe
const cafeTableId = "tblD3lmNdq8ggFPuG";
// Gym
const gymTableId = "tblVS0CkmOgEvttMM";
// Park
const parkTableId = "tblxeoFfq957i8QRy";
// Restaurants
const restaurantTableId = "tblKjAt0vj4jAXxs8";
// Groceries
const groceryTableId = "tbl8rqQjLMhBaxuEh";

const submit = document.getElementById("submit");
const output = document.getElementById("output");
const priority1 = document.getElementById("priority1");
const priority2 = document.getElementById("priority2");
const priority3 = document.getElementById("priority3");



// Helper
function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Map selection to table
function getTableIdFromSelection(selection) {
  switch (selection) {
    case "cafes":
      return cafeTableId;
    case "parks":
      return parkTableId;
    case "gym":
      return gymTableId;
    case "restaurants":
      return restaurantTableId;
    case "grocery":
      return groceryTableId;
    default:
      return groceryTableId; // fallback
  }
}

// 1. renderOutput function (partial for gyms - make sure this is included)
function renderOutput(records, type) {
  let innerHTML = '<div class="cards-container">';
  records.forEach((record) => {
    const imgSrc =
      record.fields.image ||
      "https://via.placeholder.com/300x200?text=No+Image";
    if (type === "gym") {
      innerHTML += `
        <div class="card">
          <img src="${imgSrc}" alt="${record.fields.Name}">
          <div class="card-body">
            <h4>${record.fields.Name || "Untitled"}</h4>
            <button class="gym-btn" data-gym-id="${
              record.id
            }" style="margin:10px 1rem; padding:8px 12px; background-color:#3498db; border:none; color:white; border-radius:4px; cursor:pointer;">
              View Details →
            </button>
            <div class="gym-description" id="gym-desc-${
              record.id
            }" style="display:none; margin-top:10px; padding-top:10px; border-top:1px solid #ddd;">
              <!-- Description inserted dynamically -->
            </div>
          </div>
        </div>
      `;
    } else {
      // non-gym cards as clickable anchors
      innerHTML += `
        <a href="#" class="card clickable-card" style="text-decoration:none; color:inherit;">
          <img src="${imgSrc}" alt="${record.fields.Name}">
          <div class="card-body">
            <h4>${record.fields.Name || "Untitled"}</h4>
            ${
              record.fields.Address
                ? `<p><strong>Address:</strong> ${record.fields.Address}</p>`
                : ""
            }
            ${
              record.fields.Hours
                ? `<p><strong>Hours:</strong> ${record.fields.Hours}</p>`
                : ""
            }
            ${
              record.fields.Prices
                ? `<p><strong>Price Range:</strong> ${record.fields.Prices}</p>`
                : ""
            }
            ${
              record.fields.Ratings
                ? `<p><strong>Ratings:</strong> ${record.fields.Ratings}</p>`
                : ""
            }
            ${
              record.fields.Number
                ? `<p><strong>Phone:</strong> ${record.fields.Number}</p>`
                : ""
            }
            ${
              record.fields.Cuisine
                ? `<p><strong>Cuisine:</strong> ${record.fields.Cuisine}</p>`
                : ""
            }
          </div>
        </a>
      `;
    }
  });
  innerHTML += "</div>";
  return innerHTML;

}



// Fetch records for a given table
const fetchTable = async (baseId, tableId, token) => {
  let response;
  try {
    response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching table:", error);
    return { records: [] }; // To avoid breaking output
  }
};

// Main submit handler
async function handleSubmit(event) {
  
  event.preventDefault(); // stop form reload

  const selectedOption1 = priority1.value;
  const selectedOption2 = priority2.value;
  const selectedOption3 = priority3.value;

  let outputHTML = "";

  // Priority 1
  if (selectedOption1) {
    const tableId1 = getTableIdFromSelection(selectedOption1);
    const data1 = await fetchTable(baseId, tableId1, token);
    outputHTML += `<h3><strong>${capitalize(selectedOption1)}</strong></h3>`;
    outputHTML += renderOutput(data1.records);
  }

  // Priority 2
  if (selectedOption2) {
    const tableId2 = getTableIdFromSelection(selectedOption2);
    const data2 = await fetchTable(baseId, tableId2, token);
    outputHTML += `<h3>${capitalize(selectedOption2)}</h3>`;
    outputHTML += renderOutput(data2.records);
  }

  // Priority 3
  if (selectedOption3) {
    const tableId3 = getTableIdFromSelection(selectedOption3);
    const data3 = await fetchTable(baseId, tableId3, token);
    outputHTML += `<h3>${capitalize(selectedOption3)}</h3>`;
    outputHTML += renderOutput(data3.records);
  }

  // This is the critical missing line:
  output.innerHTML = outputHTML;
}

async function run() {
  console.log("Page loaded, waiting for user input");
}

document.addEventListener("DOMContentLoaded", run);
submit.addEventListener("click", handleSubmit);

output.innerHTML = outputHTML;

// Attach click event listeners for gym buttons
const gymButtons = document.querySelectorAll(".gym-btn");
gymButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const gymId = button.getAttribute("data-gym-id");
    const detailDiv = document.getElementById(`gym-detail-${gymId}`);

    // Toggle visibility
    if (detailDiv.style.display === "none" || detailDiv.style.display === "") {
      detailDiv.style.display = "block";
      button.textContent = "Hide Details ↑";
    } else {
      detailDiv.style.display = "none";
      button.textContent = "View Details →";
    }
  });
});

