// https://catfact.ninja/facts

let previous = document.getElementById("previous");
let next = document.getElementById("next");

let inputPage = 1;
let inputLimit;
let count = 0;
let pageNum = document.getElementById("pageNum");
let limit = document.getElementById("limitOption");
let paginationHolder = document.getElementById("paginationHolder");
let loading = document.getElementById("loadingState");
limit.addEventListener("input", (e) => {
  inputLimit = e.target.value;

  fetchingApi(inputPage);
});
fetchingApi(inputPage);

async function fetchingApi(inputPage) {
  const params = new URLSearchParams({
    limit: 10,
    // offset: 6 * 10,
  });
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
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
  loading.style.display = "block";
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

  const footer = document.getElementById("linkPagination");
  footer.style.display = "flex";
  footer.style.alignItems = "center";
  footer.innerHTML = "";
  const preBtn = document.createElement("button");
  footer.appendChild(preBtn);
  preBtn.innerText = "Previous";
  preBtn.setAttribute(
    "style",
    " border: 2px solid rgb(241, 115, 241) ; border-radius:7px; font-size: 18px; font-weight:600; padding:12px; cursor:pointer "
  );
  const CreatepaginationLink = (link) => {
    const anchor = document.createElement("a");
    anchor.innerText = link.label;
    anchor.style.padding = "8px";
    anchor.style.cursor = "pointer";
    if (link.label == "Next" || link.label == "Previous") {
      const p = document.createElement("p");
      footer.appendChild(p);
      p.innerText = null;
      p.style.padding = "4px";
      return p;
    }
    anchor.addEventListener("click", (e) => {
      const newPage = e.target.innerText;
      inputPage = newPage;
      fetchingApi(inputPage);
    });
    if (link.active == true) {
      anchor.style.border = "1px solid black ";
      anchor.style.borderRadius = "5px";
    }
    return anchor;
  };

  console.log(responseData.slice(0, inputLimit));
  console.log(responseData, secondResponse.links);
  const links = secondResponse.links;
  const label = secondResponse.current_page;
  links.forEach((link) => {
    const listedLink = CreatepaginationLink(link);

    footer.appendChild(listedLink);
  });
  let i = 0;
  console.log(links[i].label);
  console.log(links[links.length - 1].label);
  n = links[links.length - 1].label;
  const nxBtn = document.createElement("button");
  nxBtn.innerText = "Next";
  nxBtn.setAttribute(
    "style",
    " border: 2px solid rgb(241, 115, 241) ; border-radius:7px; font-size: 18px; font-weight:600; padding:12px; cursor:pointer"
  );
  footer.appendChild(nxBtn);
  nxBtn.addEventListener("click", () => {
    inputPage++;
    fetchingApi(inputPage);
  });

  preBtn.addEventListener("click", () => {
    inputPage--;
    fetchingApi(inputPage);
  });
}
