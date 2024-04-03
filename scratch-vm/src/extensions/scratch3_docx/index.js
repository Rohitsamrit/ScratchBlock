const ArgumentType = require('../../extension-support/argument-type')
const BlockType = require('../../extension-support/block-type') 
const Cast = require('../../util/cast')
const log = require('../../util/log')
class Scratch3Docx{
    constructor(runtime) {
        this.runtime = runtime;
        this.docxContent = "";
        this.canvas = document.getElementById('docx');
    }
    getInfo(){
        return {
            id:"docx",
            name:"Docx",
            blocks: [
                {
                    opcode: "newLine",
                    blockType: BlockType.COMMAND,
                    text: 'newLine',
                    arguments: {}
                },
                {
                    opcode: "insertHeading",
                    blockType: BlockType.COMMAND,
                    text: 'insertHeading[TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "Heading"
                        }
                    }
                },
                {
                    opcode: "insertText",
                    blockType: BlockType.COMMAND,
                    text: 'insertText[TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "Text"
                        }
                    }
                },
                {
                    opcode: "insertImage",
                    blockType: BlockType.COMMAND,
                    text: 'insertImage[URL]',
                    arguments: {
                        URL: {
                            type: ArgumentType.STRING,
                            defaultValue: "Image URL"
                        }
                    }
                },
                {
                    opcode: "make",
                    blockType: BlockType.COMMAND,
                    text: 'make[TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.DROPDOWN,
                            defaultValue: "B",
                            menu: "boldItalicUnderlineMenu"
                        }
                    }
                },
                {
                    opcode: "align",
                    blockType: BlockType.COMMAND,
                    text: 'align[TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.DROPDOWN,
                            defaultValue: "L",
                            menu: "leftRightCenterMenu"
                        }
                    }
                },
                {
                    opcode: "erase",
                    blockType: BlockType.COMMAND,
                    text: 'erase'
                },
            ],
            menus: {
                boldItalicUnderlineMenu: {
                    items: [
                        {text: "Bold", value: "B"},
                        {text: "Italic", value: "I"},
                        {text: "Underline", value: "U"}
                    ]
                },
                leftRightCenterMenu: {
                    items: [
                        {text: "Left", value: "L"},
                        {text: "Right", value: "R"},
                        {text: "Center", value: "C"}
                    ]
                }
            }
        };
    }
    
    newLine(args){
        this.docxContent += "<br/>"; // Add a new line to the document
        console.log(this.docxContent)
        this.canvas.innerHTML = this.docxContent
    }
    
    insertHeading(args){
        const text = Cast.toString(args.TEXT);
        this.docxContent += `<h1 style="text-align:center">${text}</h1>`; // Insert a heading with the specified text
        console.log(this.docxContent)
          this.canvas.innerHTML = this.docxContent
    }

    erase(){
        this.docxContent = ""; // Clear the document
        this.canvas.innerHTML = this.docxContent
    }
    
    insertText(args){
        const text = Cast.toString(args.TEXT);
        this.docxContent += `<span>${text}</span>`; // Insert the specified text into the document
        console.log(this.docxContent)
          this.canvas.innerHTML = this.docxContent
    }
    
    insertImage(args){
        const url = Cast.toString(args.URL);
        this.docxContent += `<img src="${url}" />`; // Insert an image from the specified URL
        console.log(this.docxContent)
        this.canvas.innerHTML = this.docxContent
    }
    
    make(args){
        const format = Cast.toString(args.TEXT);
        switch(format){
            case "B":
                this.docxContent += "<strong>";
                console.log(this.docxContent)
                  this.canvas.innerHTML = this.docxContent
                break;
            case "I":
                this.docxContent += "<em>";
                console.log(this.docxContent)
                  this.canvas.innerHTML = this.docxContent
                break;
            case "U":
                this.docxContent += "<u>";
                console.log(this.docxContent)
                  this.canvas.innerHTML = this.docxContent
                break;
            }
        }
        
        align(args){
            const alignment = Cast.toString(args.TEXT);
            switch(alignment){
            case "L":
                this.docxContent = "<div style='text-align:left;'>" + this.docxContent + "</div>";
                console.log(this.docxContent)
                  this.canvas.innerHTML = this.docxContent
                break;
            case "R":
                this.docxContent = "<div style='text-align:right;'>" + this.docxContent + "</div>";
                console.log(this.docxContent)
                  this.canvas.innerHTML = this.docxContent
                break;
            case "C":
                this.docxContent = "<div style='text-align:center;'>" + this.docxContent + "</div>";
                console.log(this.docxContent)
                  this.canvas.innerHTML = this.docxContent
                break;
        }
    }

    saveDocx(){
        // You can implement this method to save the docxContent to a file or perform any other necessary actions
    }
};

module.exports = Scratch3Docx;