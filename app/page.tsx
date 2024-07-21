import Cookie from "@/components/cookie";
import { GoogleGenerativeAI } from "@google/generative-ai";
import styles from "./page.module.css"

export default async function Home() {

  const getFortune = async () => {
    var fortune = '';
    if (process.env.NEXT_PUBLIC_API_KEY) {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
        const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "be oddly specific, quirky, mysterious, but within the bounds of reality. integrate a little bit of internet slang when appropriate. be concise, straight to the point, no intros/outros, and limit responses to 1-2 sentences",
        });
    
        const prompt = "what's my fortune for today in a single line";
    
        const result = await model.generateContent([prompt]);
        fortune = result.response.text();
    }
    return fortune;
  }

  return (
    <div>
      <p className={styles.desc}>u have a new fortune!<br></br>click on the cookie to open</p>
      <Cookie fortune={await getFortune()}></Cookie>
    </div>
  );
}
