import React,{Component} from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';


class EditorComponent extends Component{
    constructor(){
        super()
        this.state = {
            text: '',
            title: '',
            id: ''
        }
    }
// when this component first gets pushed to the dom
componentDidMount =()=>{
    this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id 
    })
}

//whenever the component properties are updated
componentDidUpdate = ()=>{
    if(this.props.selectedNote.id !== this.state.id){
        this.setState({
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id 
        })
    }
}
updateBody = async(val)=>{
     await this.setState({text:val })
     this.update()
}
updateTitle = async (txt)=>{
    await this.setState({title: txt})
    this.update();
}
update  = debounce(()=>{
    this.props.noteUpdate(this.state.id,{
        title: this.state.title,
        body: this.state.text
    })
},1500)
//debounce sets delay before sending value to db // sending function into the function
// update = debounce(()=>{
//     console.log('updating db') //waits for user to stop typing
//     //coming back later
// }, 1500)

    render(){
    const {classes} = this.props //deconstruct classes variable
        return(
        <div className={classes.editorContainer}>
            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
            <input
                className = {classes.titelInput}
                placeholder = 'Note title...'
                value = {this.state.title ? this.state.title: '' }
                onChange ={ (e)=> this.updateTitle(e.target.value)}
            >
            
            </input>
            <ReactQuill 
            value = {this.state.text} 
            onChange = {this.updateBody}>   
             </ReactQuill> 
        </div>)

    }

}

export default withStyles(styles)(EditorComponent) //styles is a function that we input in styles.js
//withStyles in material