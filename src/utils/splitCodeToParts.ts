class SplitCodeToParts {
  constructor(
    public code: string,
    public maxLenght: number = 500,
    public tagName: "style" | "script" = "style"
  ) {}

  isValidBrackets(text: string): boolean {
    const bracketPairs: {} = { "[": "]", "{": "}", "(": ")" };
    const closingBrackets = new Set(Object.values(bracketPairs));
    console.log(closingBrackets);

    const open: [] = [];
    for (const char of text) {
      if (closingBrackets.has(char)) {
        if (char === open[open.length - 1]) open.pop();
        else return false;
      }
      if (char in bracketPairs) open.push(bracketPairs[char]);
    }

    return open.length ? false : true;
  }

  splitString(): Array<string> {
    let arr = [];
    let string = this.code;
    const openTag = `<${this.tagName}>`;
    const closeTag = `</${this.tagName}>`;

    while (string.length) {
      const strr = string.substring(
        0,
        this.maxLenght - openTag.length - closeTag.length
      );
      let part = "";

      if (this.isValidBrackets(strr)) {
        part = strr.substring(0, strr.lastIndexOf("}") + 1);
      } else if (!this.isValidBrackets(strr)) {
        let partDouble = strr.substring(0, strr.lastIndexOf("}") - 1);
        part = partDouble.substring(0, partDouble.lastIndexOf("}") + 1);
        if (!this.isValidBrackets(string)) string = "";
      }

      if (this.tagName === "script") {
        if (part.startsWith(";")) part = part.substring(1);
        if (part.length) part = `${part};`;
      }

      part.length && arr.push(`${openTag}${part}${closeTag}`);
      string = string.substring(part.length, string.length - 1);
    }

    arr.forEach((item) => console.log(item));

    return arr;
  }
}

export default SplitCodeToParts;
