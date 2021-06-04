const chalk = require("chalk");
const { argv } = require("yargs");
const yargs = require("yargs");

const notes = require("./notes.js");

// const command = process.argv[2];

//Customize yargs version
yargs.version("1.1.0");

//create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true, // only if you need other argument like title etc.
      type: "string",
    },

    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
    // console.log("Title: " + argv.title);
    // console.log("Body: " + argv.body);
  },
});

//Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
    // console.log("Removing the note");
  },
});

//Create list command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler() {
    notes.listNotes();
    // console.log("Listing out all notes");
  },
});

//Create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
    // console.log("Reading a note");
  },
});

//add, remove, read, list

// console.log(process.argv);
// console.log(yargs.argv);
yargs.parse();
