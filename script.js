// https://catfact.ninja/facts

let refresh = document.getElementById("refresh");
refresh.addEventListener("click", () => {
  window.location.reload();
});

let previous = document.getElementById("previous");
let paginationValue = document.getElementById("paginationValue");
let next = document.getElementById("next");

let count = 0;
let pageNum = document.getElementById("pageNum");
let limit = document.getElementById("limit");
let subBtn = document.getElementById("subBtn");
// let x;
let inputPage;
let inputLimit;
subBtn.addEventListener("click", () => {
  inputPage = parseInt(pageNum.value) || 1;
  inputLimit = parseInt(limit.value);
  paginationValue.innerText = inputPage;
  if (inputLimit > 10) {
    alert("Limit exceed Num...10");
    return 0;
  }
  if (inputPage > 35) {
    alert("Page number limit exceed!..");
    return 0;
  }

  if (inputPage < 1) {
    alert("Page number cannot be -Ve..");
    return 0;
  }

  fetchingApi();
});

const params = new URLSearchParams({
  limit: 10,
  // offset: 6 * 10,
});

async function fetchingApi() {
  let firstResponse = await fetch(
    `https://catfact.ninja/facts?${params.toString()}&page=${inputPage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let secondResponse = await firstResponse.json();
  let responseData = secondResponse.data;
  let para = document.getElementById("mainSection");
  para.innerHTML = " ";
  let ul = document.createElement("ul");
  para.appendChild(ul);
  sliceLimit = responseData.slice(0, inputLimit || 10);
  sliceLimit.forEach((info) => {
    let li = document.createElement("li");
    li.setAttribute("style", "margin:15px");
    ul.appendChild(li);
    li.innerText = info.fact;
  });

  console.log(responseData.slice(0, inputLimit));
}

previous.addEventListener("click", () => {
  inputPage = inputPage - 1;
  paginationValue.innerText = inputPage || 1;

  fetchingApi();
});
next.addEventListener("click", () => {
  inputPage = inputPage + 1;
  paginationValue.innerText = inputPage;
  fetchingApi();
});
