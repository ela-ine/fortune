import Cookie from "@/components/cookie";
import { GoogleGenerativeAI } from "@google/generative-ai";
import styles from "./page.module.css"

export const revalidate = 3;

export default async function Home() {
  const getFortune = async () => {
    var fortune = '';
    if (process.env.NEXT_PUBLIC_API_KEY) {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
        const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "be oddly specific, quirky, whimsical, mysterious, but within the bounds of reality. integrate a little bit of internet slang (post-2020) when appropriate (no hashtags). be concise, straight to the point.",
        });
    
        const prompt = "generate a new fortune about today in 20 words or less";
    
        const result = await model.generateContent([prompt]);
        fortune = result.response.text();
    }
    console.log("getting fortune...", fortune)
    return fortune;
  }

  return (
    <div>
      <p className={styles.desc}>u have a new fortune!<br></br>click on the cookie to open</p>
      <Cookie fortune={await getFortune()}></Cookie>
    </div>
  );
}
