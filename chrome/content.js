"use strict";

(async function main(){
const options = {};
const data = await chrome.storage.sync.get("options");
Object.assign(options, data.options);
if (!options.sites){
    options.sites = [
        "twitter.com",
        "reddit.com",
        "facebook.com",
        "instagram.com",
        "youtube.com",
        "tiktok.com"
    ];

    chrome.storage.sync.set({ options });
}

let warnings = [
    {
        labels: [
            "Social media is associated with an increase in depressive symptoms and other mental health problems among adolescents",
            "There's a connection between social media use and depression, as well as other negative outcomes such as anxiety, poor sleep, low self-esteem, and social and appearance anxiety."
        ],
        sources: ["https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10294999/"]
    }
];


let random = (mn, mx) => {
    return Math.random() * (mx - mn) + mn;
};

let matchesDomain = false;
for (let i = 0; i < options.sites.length; i++){
    if (window.location.hostname.toLowerCase().endsWith(options.sites[i].toLowerCase())){
        matchesDomain = true;
        break;
    }
}

if (matchesDomain){
    const stickyContainer = document.createElement('div');
    stickyContainer.className = "smwl-warningRoot";
    document.body.prepend(stickyContainer);
    const warningLabel = document.createElement('div');
    warningLabel.className = "smwl-warningSticker";
    warningLabel.style.cssText = `position:fixed; bottom:0; left: 0; right: 0; width:-webkit-fill-available; height:auto; padding:20px; z-index:1000000; background:white; border:10px solid black;color:black; font-size:2rem; line-height:normal; text-align: center;align-items:center; justify-content:space-around; display: flex; font-family:"Roboto Condensed",Helvetica,Arial,sans-serif; font-weight: 700`;
    warningLabel.onclick = () => {
        warningLabel.style.display = 'none';
    };

    const warnIdx = Math.floor(random(0, warnings.length));
    const warning = warnings[warnIdx];
    const labelIdx = Math.floor(random(0, warning.labels.length));
    const label = warning.labels[labelIdx];
    const sources = warning.sources.map((s, idx) => {
        return `[<a href="${s}" style="color: blue">${idx + 1}</a>]`;
    }).join(" ");

    const warningText = document.createElement('span');
    warningText.innerHTML = `${label} ${sources}`;
    stickyContainer.append(warningLabel);
    warningLabel.append(warningText);
}

})();
