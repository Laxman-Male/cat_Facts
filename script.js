// https://catfact.ninja/facts
let mainSection = document.getElementById("mainSection");
let DivPagination = document.getElementById("linkPagination");
let inputLimit = document.getElementById("limitOption");
let firstPromise;
let catfactData;
let inputPage;

let current_page = 1;
let limit = 1;
forAutoReload(current_page);
async function forAutoReload(page) {
  const r = await featchApi(limit, page);
  displayCatFact();
  DivPagination.innerHTML = "";
  fotterPaggination();
}

inputLimit.addEventListener("input", async (e) => {
  limit = e.target.value;
  const response = await featchApi(limit, current_page);

  catfactData = response.data;
  links = response.links;

  displayCatFact();
  DivPagination.innerHTML = "";
  fotterPaggination();
});

async function featchApi(inputLimit, current_page) {
  const params = new URLSearchParams({
    limit: inputLimit,
    page: current_page,
    //offset or skip = page -1 * limit
  });
  let ApiFeatching = await fetch(
    `https://catfact.ninja/facts?${params.toString()}`,
    {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  firstPromise = await ApiFeatching.json();
  catfactData = firstPromise.data;
  return firstPromise;
}

function displayCatFact() {
  mainSection.innerHTML = " ";
  let ul = document.createElement("ul");
  mainSection.appendChild(ul);
  catfactData.forEach((e) => {
    let li = document.createElement("li");
    li.setAttribute("style", "margin:15px");
    ul.appendChild(li);
    li.innerText = e.fact;
  });
}

function fotterPaggination() {
  const links = firstPromise.links;
  links.forEach((link) => {
    let page = link.label;
    const listedLink = createPageLink(link, page);

    DivPagination.appendChild(listedLink);
  });
  return links;
}

const createPageLink = (link, page) => {
  const anchor = document.createElement("a");
  anchor.innerText = link.label;
  anchor.href = "#";
  anchor.style.textDecoration = "none";
  if (anchor.innerText == "Previous" || anchor.innerText == "Next") {
    anchor.style.border = "1px solid black";
    anchor.style.padding = "1px";
    anchor.style.margin = "10px";
  }
  DivPagination.appendChild(anchor);

  anchor.style.padding = "8px";
  if (link.active == true) {
    anchor.style.border = "1px solid black";
  }
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    let a = e.target.innerText;
    if (a == "Next") {
      current_page++;
    } else if (a == "Previous") {
      if (current_page > 1) {
        current_page--;
      }
    } else {
      current_page = page;
    }
    forAutoReload(current_page);
  });
  return anchor;
};
