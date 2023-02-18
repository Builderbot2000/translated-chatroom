import React from 'react';
import './css/login.scss'
const { Component } = React
class EntryPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentView: "signUp"
        }
    }

    changeView = (view) => {
        this.setState({
            currentView: view
        })
    }

    currentView = () => {
        switch(this.state.currentView) {
            case "signUp":
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
                break
            case "PWReset":
                return (
                    <form>
                        <h2>Reset Password</h2>
                        <fieldset>
                            <legend>Password Reset</legend>
                            <ul>
                                <li>
                                    <em>A reset link will be sent to your inbox!</em>
                                </li>
                                <li>
                                    <label for="email">Email:</label>
                                    <input type="email" id="email" required/>
                                </li>
                            </ul>
                        </fieldset>
                        <button>Send Reset Link</button>
                        <button type="button" onClick={ () => this.changeView("logIn")}>Go Back</button>
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