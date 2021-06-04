const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);

  // if (duplicateNotes.length === 0) {

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    // console.log(notes);
    console.log(chalk.green.inverse("New Note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken"));
  }
};

// Remove Note
const removeNote = (title) => {
  // console.log(title);

  const notes = loadNotes();

  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notesToKeep.length !== notes.length) {
    console.log(chalk.bgGreen("Note removed"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.bgRed("No note found"));
  }
  // console.log(notes);
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.inverse("Your notes"));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();

  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("No Note found"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// module.exports = getNotes;
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
