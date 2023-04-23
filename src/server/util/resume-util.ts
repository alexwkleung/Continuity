import fs from 'fs'
import { EvaSTUtil } from 'eva-st-util'
import puppeteer, { PaperFormat } from 'puppeteer'

export class ResumeUtil {
    private parseMarkdownFile(markdownPath: string, htmlPath: string): void {
        //read content from resume.md
        const readFile = fs.readFile(markdownPath, 'utf-8', (error, data) => {
            //if exception is thrown from fs 
            if(error) {
                //output exception message
                console.error(error);
            } else {                
                //call appendToHtmlFile function with the stylesheet template literal and converted markdown as arguments
                this.appendToHtmlFile(htmlPath, `<link rel="stylesheet" href="../styles/style.css">` + '\n' + `<div>` + EvaSTUtil.MDtoHTML_ST(data)) + `</div>`;
            }
        });
    }

    private appendToHtmlFile(htmlPath: string, data: string): void {
        //write data to resume.html
        const writeFile = fs.writeFile(htmlPath, data, (error) => {
            //if exception is thrown from fs
            if(error) {
                //output exception message
                console.error(error);
            }
        });
    }

    private async exportToPdf(htmlPath: string, pdfFormat: PaperFormat | undefined, pdfPath: string | undefined): Promise<void> {
        //launch puppeteer browser instance
        const browser = await puppeteer.launch({
            headless: true
        });

        //create new page object
        const page = await browser.newPage();

        //read resume.html synchronously
        const readHtml = fs.readFileSync(htmlPath, 'utf-8');

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
            path: pdfPath
        });

        //close puppeteer browser instance
        await browser.close();
    }

    private isPdfFormatValid(pdfFormat: PaperFormat | undefined): boolean {
        //assign false to initial state of isValid
        let isValid = false;

        //check if pdfFormat is Letter or A4
        if(pdfFormat == 'Letter' || pdfFormat == 'A4') {
            //assign true to isValid
            isValid = true;
        //if condition is false
        } else {
            //assign false to isValid
            isValid = false;
        }

        //return isValid
        return isValid;
    }

    /**
     * invoke function
     * 
     * Calls `parseMarkdownFile` and `exportToPdf` functions. Arguments passed into `invoke` 
     * will be passed into `exportToPdf` and/or `parseMarkdownFile`.
     * 
     * @access public
     * @param markdownPath Path to Markdown file (i.e., `'src/client/resume.md'`)
     * @param htmlPath Path to HTML file (i.e., `'src/client/output-html/resume.html'`)
     * @param pdfFormat Paper size for PDF export (options: `'Letter'`, `'A4'`)
     * @param pdfPath Path to save PDF output (i.e., `'src/client/output-pdf/resume.pdf'`)
     */
    public invoke(markdownPath: string, htmlPath: string, pdfFormat: PaperFormat | undefined, pdfPath: string | undefined): void {
        //call parseMarkdownFile function
        this.parseMarkdownFile(markdownPath, htmlPath);

        //check if pdfFormat is valid
        if(this.isPdfFormatValid(pdfFormat)) {
            //call exportToPDF function
            this.exportToPdf(htmlPath, pdfFormat, pdfPath);
        } else {
            //throw unsupported pdf format
            throw console.error("Unsupported PDF format.");
        }
    }
}