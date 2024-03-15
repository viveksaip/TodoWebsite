import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component{

//add constructor for this class
constructor(props){
  super(props); //It helps to initalize parent constructors as well
  this.state={
    notes:[] //one array variable to dispaly the nodes
  }
}

API_URL = "http://localhost:5038/";
api_vs = "http://localhost:5038/todowebsite/todoapp/getnotes";

//this function will execute once the page is loaded
componentDidMount(){
  this.refreshNotes();
}

/*
//method to get the data from API to the notes array
async refreshNotes(){
  //we will use 'fetch' method to call the API, to get nodes data 
  //fetch(this.API_URL+"todowebsite/todoapp/GetNotes").then(response=>response.json())
  fetch(this.api_vs).then(response=>response.json())
  .then(data=>{
    //once the response is received, we will update the 'notes array variable' by setting the state
    this.setState({notes:data});
  })
}
*/
async refreshNotes(){
  fetch(this.API_URL + "todowebsite/todoapp/GetNotes")
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          this.setState({ notes: data });
      })
      .catch(error => {
          console.error('Fetch error:', error);
      });
  }

async addClick(){
  //capture the input data from textbox 
  var newNotes = document.getElementById("newNotes").value ;
  //we need 'FormData' to send to the post api method
  const data = new FormData();
  data.append("newNotes", newNotes);

  fetch(this.API_URL + "todowebsite/todoapp/AddNotes",{
    method: "POST",
    body: data
  }).then(res=>res.json())
  .then((result)=>{
    alert(result);
    this.refreshNotes();
  })
}

async deleteClick(id){
  fetch(this.API_URL + "todowebsite/todoapp/DeleteNotes?id="+id,{
    method: "DELETE",
  }).then(res=>res.json())
  .then((result)=>{
    alert(result);
    this.refreshNotes();
  })
}

render() {
  const{notes} = this.state;
  return (
    <div className="App">
      <h2>Todo App</h2>
      <input id="newNotes"/>&nbsp;
      <button onClick={()=> this.addClick()}>Add Notes</button>
      {notes.map(note=>
        <p>
          <b>* {note.des} </b>
          <button onClick={()=> this.deleteClick(note.id)}>Delete Notes</button>
        </p>
      )}
    </div>
  );
}
}

export default App;
