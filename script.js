const token =
  "patLOTFMojBBXhCEr.7be0db23aad8ffa59aef56de86ad85c4ae379de818f47a515eea9ad303962195";
const baseId = "appbWMhKH8Qs0uMgb";
const tableId = "tblD3lmNdq8ggFPuG";
//Cafe
const cafeTableId = "tblD3lmNdq8ggFPuG";
//Gym
const gymTableId = "VS0CkmOgEvttMM";
//Park
const parkTableId = "tblxeoFfq957i8QRy";
//Restaurants
const restaurantTableId = "tblKjAt0vj4jAXxs8";
//Groceries
const groceryTableId = "tbl8rqQjLMhBaxuEh";
const submit = document.getElementById("submit");
const output = document.getElementById("output");
const priority1 = document.getElementById("priority1");

let records = [];
const fetchTable = async (baseId, tableId, token) => {
  console.log("fetchTable");
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
    console.log(JSON.stringify(data.records, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching table:", error);
  }
};

function renderOutput(records) {
  let innerHTML = "";
  records.forEach((record) => {
    innerHTML += `
  <article>
    <header>
        <h2>${record.fields.Name}</h2>
    </header>
  </article>
  `;
  });

  return innerHTML;
}
function handleSubmit(event) {
  //
  console.log(event);
  console.log(priority1.value);
  const innerHTML = renderOutput(records.records);
  output.innerHTML = innerHTML;
}
async function run() {
  records = await fetchTable(baseId, groceryTableId, token);
}
document.addEventListener("DOMContentLoaded", run);
submit.addEventListener("click", handleSubmit);
