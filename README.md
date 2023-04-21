<h1 align=center>📝 Continuity</h1>

![resume]()

Create a resume using Markdown and CSS. 

Just fill in the template, run the script, and you'll have a simple resume in PDF format ready to go!

# Table of Contents

1. [Installation](#installation)

2. [Usage](#usage)

3. [Contributions](#contributions)

4. [License](#license)

# Installation 

1. Install [Node.js](https://nodejs.org/en/download).

2. Clone the repository or download the [latest release]().

```bash
git clone <SSH/HTTPS URL>
```

3. Change directory

```bash
cd <...>/Continuity
```

4. Install npm dependencies

```bash
npm install
```

# Usage 

1. Edit `resume.md` located in the `src/client` directory. A template skeleton is already created, so you just need to fill it in.

2. If you do not like the current style/theme of the resume, you can modify `style.css` located in the `src/client/styles` directory.

3. Once you're ready to generate the PDF file, run the script below:

```bash
# generate PDF file from markdown skeleton
npm run resume
# or
make resume
```

4. The generated resume PDF (`resume.pdf`) will be located in the `src/client/output-pdf` directory.

5. If you want to preview the HTML version of the resume, you can run the following scripts to open the server. Alternatively, you can just open `resume.html` located in the `src/client/output-html` directory if you don't want to use the server. 

**Note:** The HTML version may not be visually identical to the generated PDF due to formatting differences caused by the conversion.

```bash
# compile
npm run resume
# or 
npm run build
# or 
make build
# or
make resume

# run server
npm run server
# or
make server
```

# Contributions

Contributions are welcomed, but is 100% optional.

Feel free to submit a [new issue](https://github.com/alexwkleung/Continuity/issues) or a [pull request](https://github.com/alexwkleung/Continuity/pulls) if you have any improvements or concerns.

# License 

[MIT License.](https://github.com/alexwkleung/Continuity/blob/main/LICENSE)