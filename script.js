console.log("hello ");
// https://catfact.ninja/facts
let mainSection = document.getElementById("mainSection");
let firstPromise;
let catfactData;
let inputLimit;
let inputPage;

featchApi(1, 10);
// displayCatFact();

async function featchApi(inputPage, inputLimit) {
  const params = new URLSearchParams({
    limit: inputLimit,
  });
  let ApiFeatching = await fetch(
    `https://catfact.ninja/facts?${params.toString()}&page=${inputPage}`,
    {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  firstPromise = await ApiFeatching.json();
  catfactData = firstPromise.data;
  //   console.log(catfactData);
  displayCatFact();
}

function displayCatFact() {
  console.log(catfactData);
  mainSection.innerHTML = " ";
  let ul = document.createElement("ul");
  mainSection.appendChild(ul);
  sliceLimit = catfactData.slice(0, 5);
  sliceLimit.forEach((info) => {
    let li = document.createElement("li");
    li.setAttribute("style", "margin:15px");
    ul.appendChild(li);
    li.innerText = info.fact;
  });
}
