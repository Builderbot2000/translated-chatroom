import React from 'react';
import './css/login.scss'
const { Component } = React
class EntryPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentView: "Entry"
        }
    }

    changeView = (view) => {
        this.setState({
            currentView: view
        })
    }

    currentView = () => {
        switch(this.state.currentView) {
            case "Entry":
                return (
                    <form>
                        <h2>Lost in Translation</h2>
                        <fieldset>
                            <legend>Login</legend>
                            <ul>
                                <li>
                                    <label for="nickname">Nickname:</label>
                                    <input type="text" id="username" required/>
                                </li>
                                <li>
                                    <label htmlFor="Language">Language:</label>
                                    <input type="languae" id="language" required/>
                                </li>
                            </ul>
                        </fieldset>
                        <button>Start Chatting!</button>
                    </form>
                )
            default:
                break
        }
    }


    render() {
        return (
            <section id="entry-page">
                {this.currentView()}
            </section>
        )
    }
}
export default EntryPage