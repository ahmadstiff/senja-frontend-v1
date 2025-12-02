import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base } from "viem/chains";

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [base],
  ssr: true,
});
