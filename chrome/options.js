'use strict';

(async function main(){
    const sitesTextarea = document.getElementById("sites");
    const saveBtn = document.getElementById("save");
    const saveBtnLabel = saveBtn.value;

    const options = {};
    const data = await chrome.storage.sync.get("options");
    Object.assign(options, data.options);

    if (options.sites){
        sitesTextarea.innerHTML = options.sites.join("\n");
    }

    saveBtn.onclick = async function(){
        options.sites = sitesTextarea.value.split("\n").map(s => s.trim()).filter(s => s.length > 0);
        console.log(options);
        await chrome.storage.sync.set({ options });

        saveBtn.value = 'Saved!';
        saveBtn.disabled = true;
        setTimeout(() => { saveBtn.value = saveBtnLabel; saveBtn.disabled = false; }, 2000);
    };
})();
