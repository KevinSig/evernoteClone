import React, { Component } from "react";
import "./App.css";
import SidebarComponent from "./sidebar/sidebar";
import EditorComponent from "./editor/editor";

const firebase = require("firebase");

class App extends Component {
  constructor() {
    super();
    this.state = {
      slectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  selectNote = (note, index) => {
    this.setState({
      slectedNoteIndex: index,
      selectedNote: note
    });
  };

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });

        this.setState({
          notes: notes
        });

        console.log(notes);
      }); //onsnapshot will be called whenever the notes collection is updated in firbease
  };

  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection("notes")
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  };

  newNote = async title => {
    const note = {
      title: title,
      body: ""
    };
    const newFromDB = await 
    firebase
      .firestore()
      .collection("notes")
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      const newID = newFromDB.id //gaining access to firebase db doc id
      await this.setState({notes: [...this.state.notes,note]})
        const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id == newID)[0])
        this.setState({selectedNote: this.state.notes[newNoteIndex],selectedNoteIndex: newNoteIndex})
      }
      deleteNote = async (note)=>{
        const noteIndex = this.state.notes.indexOf(note)
        await this.setState({notes: this.state.notes.filter(_note => _note !== note)})
        if(this.state.slectedNoteIndex === noteIndex){ 
          this.setState({
            slectedNoteIndex: null, selectedNote: null})
          } else {
            this.state.notes.length > 1 ?
            this.selectNote(this.state.notes[this.state.slectedNoteIndex - 1], this.state.selectedNoteIndex - 1) : 
            this.setState({slectedNoteIndex: null, selectedNote: null})
          }
          firebase
          .firestore()
          .collection('notes')
          .doc(note.id)
          .delete()
        }
      
  
  render() {
    return (
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        ></SidebarComponent>

        {this.state.selectedNote ? (
          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          ></EditorComponent>
        ) : null}
      </div>
    );
  }
}
export default App;
