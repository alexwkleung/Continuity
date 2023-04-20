import fs from 'fs'
import { EvaSTUtil } from 'eva-st-util'
import puppeteer, { PaperFormat } from 'puppeteer'

class ResumeUtil {
    private parseMarkdownFile(): void {
        //read content from resume.md
        const readFile: void = fs.readFile('src/client/resume.md', 'utf-8', (error, data) => {
            //if exception is thrown from fs 
            if(error) {
                //output exception message
                console.error(error);
            } else {
                //log the conversion of markdown content to html elements
                //console.log(EvaSTUtil.MDtoHTML_ST(data));
                
                //call appendToHtmlFile function with the stylesheet template literal and converted markdown as arguments
                this.appendToHtmlFile(`<link rel="stylesheet" href="../styles/style.css">` + '\n' + `<div>` + EvaSTUtil.MDtoHTML_ST(data)) + `</div>`;
            }
        });
    }

    private appendToHtmlFile(data: string): void {
        //write data to resume.html
        const appendFile = fs.writeFile('src/client/output-html/resume.html', data, (error) => {
            //if exception is thrown from fs
            if(error) {
                //output exception message
                console.error(error);
            }
        });
    }

    private async exportToPdf(pdfFormat: PaperFormat | undefined, pdfOutPath: string | undefined): Promise<void> {
        //launch puppeteer browser instance
        const browser = await puppeteer.launch({
            headless: true
        });

        //create new page object
        const page = await browser.newPage();

        //read resume.html synchronously
        const readHtml = fs.readFileSync('src/client/output-html/resume.html', 'utf-8');

        //set content of browser page to resume.html
        const content = await page.setContent(readHtml, {
            waitUntil: 'load'
        });

        //add style tag to browser
        const css = await page.addStyleTag({
            path: './src/client/styles/style.css'
        });

        //create resume.pdf from current browser content
        const pdf = await page.pdf({
            format: pdfFormat,
            path: pdfOutPath
        });

        //close puppeteer browser instance
        await browser.close();
    }

    /**
     * invoke function
     * 
     * @access public
     * @param pdfFormat paper size for pdf export (options: `'letter'`, `'a4'`)
     * @param pdfOutPath path to save pdf output
     */
    public invoke(pdfFormat: PaperFormat | undefined, pdfOutPath: string | undefined) {
        //call parseMarkdownFile function
        this.parseMarkdownFile();

        //call exportToPDF function
        this.exportToPdf(pdfFormat, pdfOutPath);
    }
}

//create new ResumeUtil object
const resumeUtil = new ResumeUtil();

//call invoke function
resumeUtil.invoke(
    'letter', 
    'src/client/output-pdf/resume.pdf'
);