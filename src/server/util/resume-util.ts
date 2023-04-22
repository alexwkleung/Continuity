import fs from 'fs'
import { EvaSTUtil } from 'eva-st-util'
import puppeteer, { PaperFormat } from 'puppeteer'

export class ResumeUtil {
    private parseMarkdownFile(markdownResumePath: string, htmlPath: string): void {
        //read content from resume.md
        const readFile: void = fs.readFile(markdownResumePath, 'utf-8', (error, data) => {
            //if exception is thrown from fs 
            if(error) {
                //output exception message
                console.error(error);
            } else {
                //log the conversion of markdown content to html elements
                //console.log(EvaSTUtil.MDtoHTML_ST(data));
                
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

    private async exportToPdf(htmlPath: string, pdfFormat: PaperFormat | undefined, pdfOutPath: string | undefined): Promise<void> {
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
            path: pdfOutPath
        });

        //close puppeteer browser instance
        await browser.close();
    }

    /**
     * invoke function
     * 
     * Calls `parseMarkdownFile` and `exportToPdf` functions. Arguments passed into `invoke` will be passed into `exportToPdf` and/or `parseMarkdownFile`.
     * 
     * @access public
     * @param markdownResumePath Path to Markdown file (i.e., `'src/client/resume.md'`)
     * @param htmlPath Path to HTML file (i.e., `'src/client/output-html/resume.html'`)
     * @param pdfFormat Paper size for PDF export (options: `'letter'`, `'a4'`)
     * @param pdfOutPath Path to save PDF output (i.e., `'src/client/output-pdf/resume.pdf'`)
     */
    public invoke(markdownResumePath: string, htmlPath: string, pdfFormat: PaperFormat | undefined, pdfOutPath: string | undefined): void {
        //call parseMarkdownFile function
        this.parseMarkdownFile(markdownResumePath, htmlPath);

        //call exportToPDF function
        this.exportToPdf(htmlPath, pdfFormat, pdfOutPath);
    }
}