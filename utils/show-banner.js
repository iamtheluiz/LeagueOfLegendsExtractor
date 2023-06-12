import chalk from "chalk";
import figlet from "figlet";

export function showBanner() {
  console.log(chalk.blue(figlet.textSync(">----------<\n|  LoL Extractor  |\n>----------<", {
    font: "Big",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 90,
    whitespaceBreak: true,
  })));
}