import * as GEN_AI from "@google/generative-ai";

const Gemini = class {
	constructor({model="gemini-1.5-flash-latest",key = "",sys="",temp = 0,topP = 0,topK = 0}={}) {
		if (typeof GEN_AI == "undefined") {return};
		this.model_name = model;
		this.generationConfig = {
			temperature: temp,
			top_p: topP,
			top_k: topK
		}
		this.API_KEY = key;
		this.Model   = new GEN_AI.GenerativeModel(this.API_KEY,{
			model: this.model_name,
			systemInstruction: sys,
			generationConfig: this.generationConfig
		}) ;
		
		const history = [];
		this.chat = this.Model.startChat({ history });
		this.sendMessage = async function(msg) {
			let message = await this.chat.sendMessage(msg);
			let res = await message.response;
			let txt = await res.text();
			console.log(txt);
			txt = txt.replace("```javascript","");
			txt = txt.replace("```html","");
			txt = txt.replace("```","");
			return txt;
		}
	}
}

export {Gemini as Gemini};