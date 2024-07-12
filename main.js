import {Gemini} from "/AI/ai.js";

function setHTML(html) {
    let html_string = html;
    document.getElementById('output').src = "data:text/html;charset=utf-8," + escape(html_string);
}

function setJS(js) {
    var iframeHTML = "<html><head></head><body><script>window.addEventListener('message', (event) => {if (event.data.type === 'executeScript') {eval(event.data.script)}});</script></body></html>"
    setHTML(iframeHTML)
}

var htmlButton = $("#button1").get(0);
var jsButton = $("#button2").get(0);
var top_p = $("#top_p").get(0);
var top_k = $("#top_k").get(0);
var temp = $("#temperature").get(0);
var system = $("#system_instruction").get(0);
var gen = $("#generate").get(0);
var prompt = $("#prompt").get(0);
var next = $("#nextStep").get(0);

htmlButton.addEventListener("click",function() {
    system.value = "Respond with HTML code only. Do not explain code. Include css in the document head. Make page responsive"
})

jsButton.addEventListener("click",function() {
    system.value = "Respond with Javascript code only, inside a html script tag. Do not explain code."
})

let model;
gen.addEventListener("click",async function() {
    
     setHTML("<body style='margin:0px;'><div style='height:100vh;width:100vw;display:flex;align-items:center;align-content:center;justify-content:center;'><img src='https://organisd.net/AI/loading.gif' height=64 width=64/></div></body")
    
    model = new Gemini({
        model: "gemini-1.5-pro",
        key: "GEMINI_API_KEY",
        sys: system.value,
        temp: temp.value,
        topP: top_p.value,
        topK: top_k.value
    });
    var res = await model.sendMessage(prompt.value);
    console.log(res);
    setHTML(res);
});

next.addEventListener("click",async function() {
    setHTML("<div style='height:100vh;width:100vw;display:flex;align-items:center;align-content:center;justify-content:center;'><img src='https://organisd.net/AI/loading.gif' height=64 width=64/></div>")
    var res = await model.sendMessage(prompt.value);
    console.log(res);
    setHTML(res);
})

